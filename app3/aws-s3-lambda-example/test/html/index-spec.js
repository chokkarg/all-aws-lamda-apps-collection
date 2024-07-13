expect = chai.expect;

describe('Index.html', () => {

    beforeEach(() => {
        // Restore the replaced functions
        sinon.restore();
    });

    describe('#echo', () => {

        it('Populate the success message with the empty message', async () => {
            const message = '';

            const promise = configureAjaxSuccessMessage(message)
                .then(() => {
                    expect($('#form-response .alert.alert-success').html()).to.equal(`The response is: "${message}"`);
                });

            $(() => {
                $('#message').val(message);
                $('#echo').trigger('click');
            }, 1);

            return promise;
        });

        it('Populate the success message with the same message', async () => {
            const message = 'this is a message';

            const promise = configureAjaxSuccessMessage(message)
                .then(() => {
                    expect($('#form-response .alert.alert-success').html()).to.equal(`The response is: "${message}"`);
                });

            $(() => {
                $('#message').val(message);
                $('#echo').trigger('click');
            }, 1);

            return promise;
        });

    });

    describe('#reverse', () => {

        // Reverse function
        reverse = string => string.split('').reverse().join('');

        it('Populate the success message with the same message', async () => {
            const message = 'this is a message';
            const reverseMessage = reverse(message);

            const promise = configureAjaxSuccessMessage(reverseMessage)
                .then(() => {
                    expect($('#form-response .alert.alert-success').html()).to.equal(`The response is: "${reverseMessage}"`);
                });

            $(() => {
                $('#message').val(message);
                $('#reverse').trigger('click');
            }, 1);

            return promise;
        });

        it('Populate the fail message', async () => {
            const promise = configureAjaxFailMessage()
                .then(() => {
                    expect($('#form-response .alert.alert-danger').html()).to.equal(`Unspecified error`);
                });

            $(() => {
                $('#reverse').val(message);
                $('#echo').trigger('click');
            }, 1);

            return promise;
        });

    });

    describe('#uppercase', () => {

        // Uppercase function
        uppercase = string => string.toUpperCase();

        it('Populate the success message with the same message', async () => {
            const message = 'this is a message';
            const uppercaseMessage = uppercase(message);

            const promise = configureAjaxSuccessMessage(uppercaseMessage)
                .then(() => {
                    expect($('#form-response .alert.alert-success').html()).to.equal(`The response is: "${uppercaseMessage}"`);
                });

            $(() => {
                $('#message').val(message);
                $('#reverse').trigger('click');
            }, 1);

            return promise;
        });

        it('Populate the fail message', async () => {
            const promise = configureAjaxFailMessage()
                .then(() => {
                    expect($('#form-response .alert.alert-danger').html()).to.equal(`Unspecified error`);
                });

            $(() => {
                $('#reverse').val(message);
                $('#echo').trigger('click');
            }, 1);

            return promise;
        });

    });

});

/**
 * Intercepts a jQuery.ajax call and calls the success handler with the specified response message.
 *
 * @param {string} the message to return
 */
configureAjaxSuccessMessage = (message) => {
    // Return a promise (for chaining)
    return new Promise((resolve/*, reject*/) => {
        // Replace the $.ajax call
        sinon.replace($, 'ajax', (options) => {
            // Run async
            setTimeout(() => {
                // Invoke the handler, if present
                options.success && options.success({ message: message });
                // Resolve the promise
                resolve();
            });
        });
    });
}

/**
 * Intercepts a jQuery.ajax call and calls the error handler with the specified response message.
 *
 * @param {string} the message to return
 */
configureAjaxFailMessage = (message) => {
    // Return a promise (for chaining)
    return new Promise((resolve/*, reject*/) => {
        // Replace the $.ajax call
        sinon.replace($, 'ajax', (options) => {
            // Run async
            setTimeout(() => {
                // Invoke the error handler, if present
                options.error && options.error({responseJSON: { message: message }});
                // Resolve the promise
                resolve();
            });
        });
    });
}
