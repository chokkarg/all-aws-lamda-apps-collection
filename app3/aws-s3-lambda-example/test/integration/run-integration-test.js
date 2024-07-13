let chalk = require('chalk');
let runServer = require('../server-util/run-server').runServer;

runServer(() => {

    // Run Cypress tests
    return require('cypress').run({
        // Read in the environment from cypress.dev.json
        env: require('../../cypress.dev.json')
    })
    .then(results => {
        // If there are any errors, display them
        if (0 !== results.totalFailed) {
            results.runs.forEach(run => {
                run.tests
                .filter(test => 'failed' === test.state)
                .forEach(test => console.error(chalk.red(test.title.join(' / '), test.error)));
            });

            // ...and reject with the number of failed integration tests
            return Promise.reject(`${results.totalFailed} failed integration tests`);
        } else {
            // Resolve (success)
            return Promise.resolve();
        }
    });

});
