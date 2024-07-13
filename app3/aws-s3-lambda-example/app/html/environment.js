((global, selectedEnvironmentName) => {

    // Provide different environments; this is not a production-ready approach to
    // providing environments at runtime, but does provide the need to illustrate different
    // environments
    const ENVIRONMENTS = {
        dev: {
            api: {
                endpoints: {
                    echo: 'http://localhost:3000/api/echo',
                    reverse: 'http://localhost:3000/api/reverse',
                    uppercase: 'http://localhost:3000/api/uppercase'
                }
            }
        },
        prod: {
            api: {
                endpoints: {
                    echo: 'https://fq6kxryc23.execute-api.us-west-2.amazonaws.com/default/echo',
                    reverse: 'https://swfqbizvq7.execute-api.us-west-2.amazonaws.com/default/reverse',
                    uppercase: 'https://j4xdtkvfo6.execute-api.us-west-2.amazonaws.com/default/uppercase'
                }
            }
        }
    }

    // Default to the "production" environment
    global.environment = ENVIRONMENTS[selectedEnvironmentName] || ENVIRONMENTS.prod;

})(this, new URLSearchParams(location.search).get('environment'));