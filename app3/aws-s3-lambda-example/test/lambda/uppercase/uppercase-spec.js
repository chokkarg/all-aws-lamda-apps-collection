const uppercaseLambda = require('../../../app/lambda/uppercase/index');
const lambdaExecutor = require('../lambdaExecutor');

describe('Lambda: echo', () => {

    it('return an error message when no message is passed in', async () => {
        const message = '';
        const errorMessage = 'No "message" parameter detected';
        const returnedMessage = await lambdaExecutor.executeLambda(uppercaseLambda, message);

        expect(returnedMessage).toEqual(errorMessage);
    });

    it('return the message passed in, in uppercase', async () => {
        const message = 'test message';
        const uppercaseMessage = message.toUpperCase();
        const returnedMessage = await lambdaExecutor.executeLambda(uppercaseLambda, message);

        expect(returnedMessage).toEqual(uppercaseMessage);
    });

});