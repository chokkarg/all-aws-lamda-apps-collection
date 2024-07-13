exports.handler = async (event) => {
    // Get the message from the event
    const message = event.queryStringParameters.message;

    const response = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    // If there is no message, return an error
    if (!message) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: 'No "message" parameter detected'
        });
    } else {
        // Reverse the message
        response.statusCode = 200;
        response.body = JSON.stringify({
            message: message.split('').reverse().join('')
        });
    }

    // Return the response
    return response;
}