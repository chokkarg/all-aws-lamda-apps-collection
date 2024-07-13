package com.serverless.example.controller;


import com.serverless.example.model.QuoteForm;
import com.serverless.example.model.Response;
import com.serverless.example.repository.entity.Quote;
import com.serverless.example.service.QuoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@RestController
@EnableWebMvc
@Slf4j
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @RequestMapping(path = "/quotes",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Quote> getQuotes() {
        List<Quote> result = quoteService.listAllQuotes();
        return result;
    }

    @RequestMapping(path = "/quote/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Quote getQuote(@PathVariable("id") String id) {
        Quote result = quoteService.getQuoteById(id);
        return result;
    }

    @RequestMapping(path = "/quote",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response createQuote(@RequestBody QuoteForm quoteForm) {
        Response response = new Response();
        try {
            Quote quote = new Quote(quoteForm);
            quoteService.createQuote(quote);
            response.setStatus("OK");
            response.setMessage("Quote created");
        } catch (RuntimeException ex) {
            log.error("Error during quote creation!");
            log.error("Exception Message {}, Cause {}", ex.getLocalizedMessage(), ex.getCause().toString());
            response.setStatus("FAILED");
            response.setMessage("Unable to create Quote");
        }

        return response;
    }

    @RequestMapping(path = "/quote/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response updateQuote(@PathVariable("id") String id, @RequestBody QuoteForm quoteForm) {
        Response response = new Response();

        try {
            Quote quote = new Quote(quoteForm);
            quote.setId(id);
            quoteService.updateQuote(id, quote);
            response.setStatus("OK");
            response.setMessage("Quote updated");
        } catch (RuntimeException ex) {
            log.error("Error during quote update!");
            log.error("Exception Message {}, Cause {}", ex.getLocalizedMessage(), ex.getCause().toString());
            response.setStatus("FAILED");
            response.setMessage("Unable to update Quote");
        }

        return response;
    }

    @RequestMapping(path = "/quote/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response deleteQuote(@PathVariable("id") String id) {
        Response response = new Response();
        try {
            quoteService.deleteQuote(id);
            response.setStatus("OK");
            response.setMessage("Quote Deleted");
        } catch (RuntimeException ex) {
            log.error("Error during quote delete!");
            log.error("Exception Message {}, Cause {}", ex.getLocalizedMessage(), ex.getCause().toString());
            response.setStatus("FAILED");
            response.setMessage("Unable to delete Quote");
        }
        return response;
    }


}
