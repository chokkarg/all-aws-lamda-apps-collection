((environment) => {

    $(document).ready(() => {
        // The jQuery elements
        let $message = $('#message');
        let $formResponse = $('#form-response');

        /**
         * Handles a successful API call by displaying the result to the user.
         *
         * @param {object} response the response object
         */
        let onSuccess = (response) => {
            $formResponse.html(`<div class="alert alert-success" role="alert">The response is: "${response.message}"</div>`);
        };

        /**
         * Handles a failed API call by displaying an error to the user.
         *
         * @param {object} error the error object
         */
        let onError = (error) => {
            // Error message (default)
            let errorMessage = 'Unspecified error';

            // If the error specifies a message, use that instead of the default
            if (error && error.responseJSON && error.responseJSON.message) {
                errorMessage = error.responseJSON.message;
            }

            // Display the message
            $formResponse.html(`<div class="alert alert-danger" role="alert">${errorMessage}</div>`);
        };

        /**
         * Invokes a GET request and handles the success or failure using onSuccess and onError.
         *
         * @param {string} url the URL to make a GET request to
         */
        let doGet = (url) => {
            // Send the AJAX request
            $.ajax({
                type: 'GET',
                url: url,
                success: onSuccess,
                error: onError
            });
        }

        $('#echo').click(event => {
            // Prevent the default behavior (submitting the form)
            event.preventDefault();

            // Get the message from the form
            const message = $message.val();

            // Send the AJAX request
            doGet(`${environment.api.endpoints.echo}?message=${message}`);
        });

        $('#reverse').click(event => {
            // Prevent the default behavior (submitting the form)
            event.preventDefault();

            // Get the message from the form
            const message = $message.val();

            // Send the AJAX request
            doGet(`${environment.api.endpoints.reverse}?message=${message}`);
        });

        $('#uppercase').click(event => {
            // Prevent the default behavior (submitting the form)
            event.preventDefault();

            // Get the message from the form
            const message = $message.val();

            // Send the AJAX request
            doGet(`${environment.api.endpoints.uppercase}?message=${message}`);
        });

    });
})(this.environment);
