let chalk = require('chalk');
let runServer = require('../server-util/run-server').runServer;

runServer(() => {

    // Run the newman tests
    return new Promise((resolve, reject) => {
        require('newman').run({
            collection: './test/api/specs/aws-sample.postman_collection.json',
            environment: './test/api/env/local.postman_environment.json'
        }, (error, summary) => {
            if (!!error) {
                // Reject on error
                reject(error);
            } else {
                if (summary.run.failures.length) {

                    // Display each error
                    summary.run.failures.forEach(failure =>{
                        console.error(chalk.red(`${failure.error.name}:`, failure.error.test));
                    });

                    // Reject with a summary of the results
                    reject(`${summary.run.failures.length} failed API tests`);
                } else {
                    // Resolve!
                    resolve();
                }
            }
        });
    });

});
