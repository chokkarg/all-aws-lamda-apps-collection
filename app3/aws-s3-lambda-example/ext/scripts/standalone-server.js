require('../../test/server-util/run-server').runServer(config => {
    let chalk = require('chalk');

    // The basename of the URL
    const URL_BASENAME = `${config.protocol}://${config.hostname}:${config.port}`;
    // The server URL
    const URL_SERVER = `${URL_BASENAME}/?environment=dev`;
    // The shutdown URL
    const URL_SHUTDOWN = `${URL_BASENAME}/shutdown`

    /**
     * Handles a successful launch.
     */
    function handleSuccess() {
        console.info(chalk.blue('server is listening at:'), chalk.green(URL_SERVER));
        console.info(chalk.blue('shutdown URL:          '), chalk.green(URL_SHUTDOWN));
    }

    /**
     * Handles an error.
     *
     * @param {*} error the error
     */
    function handleError(error) {
        console.error(chalk.red('error', error));
        process.exit(1);
    }


    // Return a promise
    return new Promise((resolve, reject) => {
        let open = require('open');

        // NOTE: The 'open' command will only resolve once the _process_ exits, not the window (or tab)
        let openProcess = open(URL_SERVER);

        // The promise chain
        openProcess
            .then(handleSuccess)
            .catch(handleError)
    });

}/*, PORT*/);