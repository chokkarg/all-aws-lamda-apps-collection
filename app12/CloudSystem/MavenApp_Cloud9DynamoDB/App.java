package au.edu.scu.ddbapp;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.AttributeAction;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValueUpdate;
import software.amazon.awssdk.services.dynamodb.model.BatchWriteItemRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;
import software.amazon.awssdk.services.dynamodb.model.DeleteItemRequest;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.ResourceNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.io.IOException;

/**
* S1-2019 Cloud System Development
* Assignment 1
* Part B
* 1. Inserts/creates 3 entries with appropriate values into the ‘Movies’ table you have created.
* 2. Finds out the last entry (that has max value) using a read operation.
* 3. Deletes the last entry.
* Author: Shu Wei, Yeh
* Student ID: 22862541
*/
public class App
{
  public static void main( String[] args ) throws IOException
  {
    String tableName = "Movies";
    DynamoDbClient ddb = DynamoDbClient.create();

    /*
    * Create 3 new items/movies into the ‘Movies’ table
    */
    HashMap<String,AttributeValue> movie1 = new HashMap<String,AttributeValue>();
    movie1.put("Id", AttributeValue.builder().n("2").build());
    movie1.put("Name",AttributeValue.builder().s("Mission: Impossible - Fallout").build());
    movie1.put("Release Year",AttributeValue.builder().n("2018").build());
    movie1.put("Genre",AttributeValue.builder().s("Action & Adventure, Drama, Mystery & Suspense").build());
    HashMap<String,AttributeValue> movie2 = new HashMap<String,AttributeValue>();
    movie2.put("Id", AttributeValue.builder().n("3").build());
    movie2.put("Name",AttributeValue.builder().s("BlacKkKlansman").build());
    movie2.put("Release Year",AttributeValue.builder().n("2018").build());
    movie2.put("Genre",AttributeValue.builder().s("Comedy, Drama").build());
    HashMap<String,AttributeValue> movie3 = new HashMap<String,AttributeValue>();
    movie3.put("Id", AttributeValue.builder().n("4").build());
    movie3.put("Name",AttributeValue.builder().s("Spider-Man: Into the Spider-Verse").build());
    movie3.put("Release Year",AttributeValue.builder().n("2018").build());
    movie3.put("Genre",AttributeValue.builder().s("Action & Adventure, Animation, Kids & Family, Science Fiction & Fantasy").build());
    // create put request object
    PutItemRequest prequest1 = PutItemRequest.builder().tableName(tableName).item(movie1).build();
    PutItemRequest prequest2 = PutItemRequest.builder().tableName(tableName).item(movie2).build();
    PutItemRequest prequest3 = PutItemRequest.builder().tableName(tableName).item(movie3).build();

    // Make the put request
    try {
      ddb.putItem(prequest1);
      ddb.putItem(prequest2);
      ddb.putItem(prequest3);
    } catch (ResourceNotFoundException e) {
      System.err.format("Error: Table name not found");
      System.exit(-1);
    } catch (DynamoDbException e) {
      System.err.println("Exeption on put operation:"+e.getMessage());
      System.exit(-1);
    }

    /*
    * Delete the last entry movie
    * Finds out the last entry (that has max value) using a read operation
    */
    Map<String, AttributeValue> lastK = null;//Determine the last item is null
    do {
      // The scan be done until lastEvaluatedKey is not null
      ScanRequest scanReq = ScanRequest.builder().tableName(tableName).limit(10).build();
      ScanResponse scanResp = ddb.scan(scanReq);

      //Update the last item
      lastK = scanResp.lastEvaluatedKey();
      DeleteItemRequest deleteRequest = DeleteItemRequest.builder().tableName(tableName).key(lastK).build();
      try {
        //deletes the last entry
        ddb.deleteItem(deleteRequest);
        System.out.println("The last entry movie,"+lastK+", has been deleted.");
      } catch (DynamoDbException e) {
        System.err.println("Exception on delete:"+e.getMessage());
        System.exit(-1);
      }
    } while (lastK != null);
  }
}
