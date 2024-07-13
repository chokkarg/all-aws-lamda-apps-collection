package lambda;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Request;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.core.sync.RequestBody;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.FileSystems;
import java.nio.ByteBuffer;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

/**
* Create another Java app in Cloud9 that creates a S3 object and tests the Lambda function.
*
*/
public class App{
  public static S3Client s3;

  public static void main( String[] args ) throws IOException{
    String bucket = "syeh-s3-bucket-lambda";
    String key = "syeh.txt";
    try {
      Region region = Region.US_EAST_1;
      s3 = S3Client.builder().region(region).build();
      byte bytes[] = "Student Name: Shu Wei, Yeh\nStudent Id: 22862541".getBytes();
      ByteBuffer data = ByteBuffer.wrap(bytes);
      s3.putObject(PutObjectRequest.builder().bucket(bucket).key(key).build(), RequestBody.fromByteBuffer(data));
      System.out.println("The object, "+key + ", has been uploaded.");
    } catch (NoSuchKeyException e) {
      System.err.println("The bucket, "+ bucket + ", does not exist.");
    }
  }
}
