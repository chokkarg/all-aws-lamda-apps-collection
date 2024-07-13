exports.handler = async (event) => {
    // Get the message from the event
    const message = event.queryStringParameters.message;

    const response = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    response.statusCode = 200;
    response.body = JSON.stringify({
        message: message
    });

    return response;
}