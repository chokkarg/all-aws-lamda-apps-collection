import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
// import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

const secret_name = "lambda_secret";

const client = new SecretsManagerClient({
  region: "eu-north-1",
});

export const handler = async (event) => {
  // const region = "eu-north-1";
  // const client = new DynamoDBClient({ region });
  // const listTablesCommand = new ListTablesCommand({});
  // console.log("listTablesCommand", listTablesCommand);
  // client
  //   .send(listTablesCommand)
  //   .then((response) => {
  //     // Extract the table names from the response
  //     const tableNames = response.TableNames;

  //     // Print the table names
  //     tableNames.forEach((tableName) => {
  //       console.log("tableName", tableName);
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Error retrieving tables:", error);
  //   });

  let response;
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      }),
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secret = response.SecretString;
  // TODO implement
  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify("Hello from Lambda!"),
  // };
  return JSON.parse(secret);
};
