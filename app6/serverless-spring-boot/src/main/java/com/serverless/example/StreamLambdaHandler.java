package com.serverless.example;



import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.internal.LambdaContainerHandler;
import com.amazonaws.serverless.proxy.model.*;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.amazonaws.services.lambda.runtime.events.SNSEvent;
import com.amazonaws.services.lambda.runtime.events.SQSEvent;
import com.amazonaws.services.lambda.runtime.events.ScheduledEvent;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;

import java.io.*;
import java.util.List;
import java.util.Map;

@Slf4j
public class StreamLambdaHandler implements RequestStreamHandler {
    private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;
    static {
        try {
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(ServerlessApplication.class);
            // If you are using HTTP APIs with the version 2.0 of the proxy model, use the getHttpApiV2ProxyHandler
            // method: handler = SpringBootLambdaContainerHandler.getHttpApiV2ProxyHandler(Application.class);
        } catch (ContainerInitializationException e) {
            // if we fail here. We re-throw the exception to force another cold start
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context)
            throws IOException {


        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        inputStream.transferTo(baos);
        InputStream firstClone = new ByteArrayInputStream(baos.toByteArray());
        InputStream secondClone = new ByteArrayInputStream(baos.toByteArray());

        final String event = new String(baos.toByteArray());
        log.info("Got event {}", event);

        ObjectMapper mapper = LambdaContainerHandler.getObjectMapper();
        mapper.configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true);
        mapper.registerModule(new JodaModule());
        SimpleModule module = new SimpleModule();

        module.addDeserializer(SQSEvent.SQSMessage.class, new SQSMessageDeserializer());
        mapper.registerModule(module);

        AwsProxyRequest request;
        try {
            ObjectReader objectReader = LambdaContainerHandler.getObjectMapper().readerFor(AwsProxyRequest.class);
            request = objectReader.readValue(firstClone);        }
        catch (Exception ex) {
            log.error("Unable to map AwsProxyRequest: {}", ex.getMessage());
            return;
        }

        if (request.getHttpMethod() == null || "".equals(request.getHttpMethod())) {
            log.info("Parsing AWS event {}", event);
            Map<String, Object> raw = (Map<String, Object>) mapper.readValue(event, Map.class);

            // Peek inside one event
            if (raw.get("Records") instanceof List) {
                List<Map<String, Object>> events = (List<Map<String, Object>>) raw.get("Records");
                if (events.size() > 0) {
                    raw = events.get(0);
                } else {
                    log.warn("Empty, dummy event records {}", events);
                }
            }

            String eventSource = (String) raw.get("source"); // CloudWatch event
            if (eventSource == null) {
                eventSource = (String) raw.get("EventSource"); // SNS
            }
            if (eventSource == null) {
                eventSource = (String) raw.get("eventSource"); // SQS!?!
            }

            if (eventSource == null) {
                log.warn("Can`t get event type: {}", raw);
            } else if ("aws.events".equals(eventSource)) {
                ScheduledEvent ev = mapper.readValue(event, AnnotatedScheduledEvent.class);
                request = convertToRequest(ev, event, AnnotatedScheduledEvent.class.getName(), context);
                log.info("Converted to {}", request);
                AwsProxyResponse response = handler.proxy(request, context);
                mapper.writeValue(outputStream, response);
            } else if ("aws:sqs".equals(eventSource)) {
                SQSEvent ev = mapper.readValue(event, AnnotatedSQSEvent.class);
                request = convertToRequest(ev, event, AnnotatedSQSEvent.class.getName(), context);
                log.info("Converted to {}", request);
                AwsProxyResponse response = handler.proxy(request, context);
                mapper.writeValue(outputStream, response);
            } else {
                log.warn("Unhandled event type {}", eventSource);
            }
        } else {
            handler.proxyStream(secondClone, outputStream, context);
        }
        //handler.proxyStream(secondClone, outputStream, context);
    }

    public class SQSMessageDeserializer extends StdDeserializer<SQSEvent.SQSMessage> {
        public SQSMessageDeserializer() {
            this(null);
        }

        public SQSMessageDeserializer(Class<?> vc) {
            super(vc);
        }

        @Override
        public SQSEvent.SQSMessage deserialize(JsonParser jp, DeserializationContext ctxt)
                throws IOException, JsonProcessingException {
            return ctxt.readValue(jp, AnnotatedSQSMessage.class);
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnnotatedSQSEvent extends SQSEvent {
        @Override
        @JsonProperty("Records")
        @JsonIgnoreProperties(ignoreUnknown = true)
        public List<SQSMessage> getRecords() {
            return super.getRecords();
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnnotatedSQSMessage extends SQSEvent.SQSMessage {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnnotatedSNSEvent extends SNSEvent {
        @Override
        @JsonProperty("Records")
        public List<SNSRecord> getRecords() {
            return super.getRecords();
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AnnotatedScheduledEvent extends ScheduledEvent {

    }

    /**
     * Delivers all event to POST /event?type=className
     */
    public static AwsProxyRequest convertToRequest(Object ev, String json, String className, Context context) {
        AwsProxyRequest r = new AwsProxyRequest();
        r.setPath("/event");
        r.setResource("/event");
        r.setHttpMethod("POST");
        MultiValuedTreeMap<String, String> q = new MultiValuedTreeMap<String, String>();
        q.putSingle("type", className);
        r.setBody(json);
        r.setMultiValueQueryStringParameters(q);
        Headers h = new Headers();
        h.putSingle("Content-Type", MediaType.APPLICATION_JSON_UTF8_VALUE);
        r.setMultiValueHeaders(h);
        AwsProxyRequestContext rc = new AwsProxyRequestContext();
        rc.setIdentity(new ApiGatewayRequestIdentity());
        r.setRequestContext(rc);
        return r;
    }
}
