package com.guneetsahai.aws.lamda;

import com.amazonaws.services.lambda.runtime.Context;
import org.apache.log4j.Logger;

public class DummyLamda {
    private Logger logger = Logger.getLogger (DummyLamda.class);

    public String myHandler(String name, Context context) {
        logger.info (context.getFunctionName () + " version - " + context.getFunctionVersion () + " invoked for name='" + name + "' and context as " + context);
        return String.format("Hello %s.", name);
    }
}
