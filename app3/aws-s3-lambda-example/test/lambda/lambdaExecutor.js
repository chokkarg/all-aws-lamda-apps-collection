exports.executeLambda =
/**
 * Simulates a lambda execution for testing.
 *
 * @param {Function} lambda the lambda to execute
 * @param {string} message the response string
 * @returns {string} the message processed by the lambda execution
 */
async function executeLambda(lambda, message) {
    // Invoke the lambda
    let response = await lambda.handler({queryStringParameters: {message: message}});

    // Get the response and parse the message
    let returnedMessage = JSON.parse(response.body).message;

    // Return the message
    return returnedMessage;
}