package au.edu.scu.s3app;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.paginators.ListObjectsV2Iterable;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Request;
import software.amazon.awssdk.services.s3.model.S3Object;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.core.sync.RequestBody;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Path;
import java.nio.file.FileSystems;
import java.nio.file.FileAlreadyExistsException;
/**
* S1-2019 Cloud System Development
* Assignment 1
* Part A
* 1. Create an object, syeh-detail.txt, into the newly created empty S3bucket, syeh-a1-s3bucket.
* 2. Read the content of the object/file, syeh-detail.txt, and save the content into local syeh-detail.tmp file.
* 3. Generate an URL for users to check whether an object is created
* Author: Shu Wei, Yeh
* Student ID: 22862541
*/
public class App
{
  public static S3Client s3;
  public static void main( String[] args ) throws IOException
  {
    String bucket = "syeh-a1-s3bucket";
    Region region = Region.US_EAST_1;
    S3Client s3 = S3Client.builder().region(region).build();
    // Create a new object in the bucket
    byte bytes[] = "My Full Name: Shu Wei, Yeh\nStudent Id: 22862541\nNumber Units Taken This Session(S1-2019): 2".getBytes();
    ByteBuffer data = ByteBuffer.wrap(bytes);
    String key2 = "syeh-detail.txt"; // new object name
    s3.putObject(PutObjectRequest.builder().bucket(bucket).key(key2).build(),RequestBody.fromByteBuffer(data));


    try {
      Path path = FileSystems.getDefault().getPath("syeh-detail.tmp");
      if (path.toFile().exists()) {
        System.err.println("The  file  temp.txt  already  exists  so  we cannot load object.");
      } else {
        GetObjectRequest req = GetObjectRequest.builder().bucket(bucket).key(key2).build();
        GetObjectResponse resp = s3.getObject(req, path);
        System.out.println("Congratulation!!!!\nThe object and syeh-detail.tmp has been created.\nObject URL:\nhttps://syeh-a1-s3bucket.s3.amazonaws.com/syeh-detail.txt");
      }
    } catch (S3Exception e) {
      System.err.println("S3 Exception: "+e.awsErrorDetails().errorMessage());
    }
  }
}
