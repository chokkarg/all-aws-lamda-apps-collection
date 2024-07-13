package lambda;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

/**
 * Create a Java app in Cloud9 to implement a handler for the intended Lambda function. 
 * Following this, create the Lambda function using the handler in AWS Lambda Console.
 */
public class TestLambda {
  // get a S3 event which has S3Event type, Implement a handler method named yourSCUusernameLambdaHandler 
    public String syehLambdaHandler(S3Event event, Context context) {
    // handler be invoked when there is an attempt of creating an object in S3 bucket
    LambdaLogger logger = context.getLogger();
    // write a log in AWS Lambda, "A S3 Event is triggered"
    logger.log("A S3 event is triggered and the test is successful.");
    return "Test done";
  }
}
