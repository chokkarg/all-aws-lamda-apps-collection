let chalk = require('chalk');
let express = require('express');
let app = express();

// Default port
const DEFAULT_PORT = 3000;

/**
 * Runs the server.
 *
 * @param {Function} the callback once the server has started (receives a config object)
 * @param {Number} [listenPort] the port to listen on
 */
exports.runServer = function runServer(onServerStarted, listenPort) {

    let port = listenPort || DEFAULT_PORT;

    /**
     * Middleware to shutdown the server (perhaps used by manual scripts).
     */
    app.get('/shutdown', (request, response) => {
        response.json({ message: 'ok' });
        stopServer();
    });

    /**
     * Middleware to execute an API function (lambda).
     */
    app.get('/api/:name', (request, response, next) => {

        // Delegate to the lambda with the matching "name"
        //
        // Create an 'event' for the lambda to consume (this might have to be
        // enhanced if the lambdas require more information in the event)
        let event = {
            queryStringParameters: request.query
        };

        // Load the actual API instance
        let lambda = require(`../../app/lambda/${request.params.name}/index`).handler;

        // Invoke the lambda
        lambda(event)
            .then(lambdaResponse => {
                // Process the results
                //
                // This might have to be revisited if the lambdas modify the response more
                Object.keys(lambdaResponse.headers).forEach(key => {
                    response.setHeader(key, lambdaResponse.headers[key]);
                });
                // Set the status code
                response.status(lambdaResponse.statusCode);
                // Set the body
                response.json(JSON.parse(lambdaResponse.body));

                // Invoke the next middleware
                return next();
            });

    });

    // Serve static content
    app.use(express.static('app/html'));

    /**
     * Stops the server.
     *
     * @returns {Promise} resolves when the server stops, rejects on stop error
     */
    function stopServer() {
        return new Promise((resolve, reject) => {
            console.info(chalk.blue('shutting down'));
            server.close(error => {
                if (!!error) {
                    console.error(chalk.red('server close error'));
                    console.error(chalk.red(error));
                    reject(error);
                } else {
                    console.info(chalk.blue('server terminated'));
                    resolve();
                }
            });
        });
    }

    // Create the server instance
    let server = app.listen(port, null, () => {
        console.info(chalk.blue('starting server'));

        // The exit code
        let exitCode = 0;

        // The server config
        let serverConfig = {
            port: port,
            protocol: 'http',
            hostname: 'localhost'
        }

        // Start the promise chain
        onServerStarted(serverConfig)
            .then(() => {
                // Handle normal case
                console.log(chalk.green('server finished'));
            })
            .catch(error => {
                // Handle exceptional case
                console.error(chalk.red('error during server run:', error));
                // Mark the exit as a failure (in case this process is used with testing)
                exitCode = 1;
            })
            .then(stopServer)
            .catch((/*error*/) => /*Swallow the error*/ null)
            .then(() => process.exit(exitCode));

        // Notify the consumer that the server has finished running
        console.info(chalk.blue(`running server on port ${port}`));
    });

}
