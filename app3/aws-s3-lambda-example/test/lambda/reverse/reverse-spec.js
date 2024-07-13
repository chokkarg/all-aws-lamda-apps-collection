const reverseLambda = require('../../../app/lambda/reverse/index');
const lambdaExecutor = require('../lambdaExecutor');

describe('Lambda: reverse', () => {

    it('return an error message when no message is passed in', async () => {
        const message = '';
        const errorMessage = 'No "message" parameter detected';
        const returnedMessage = await lambdaExecutor.executeLambda(reverseLambda, message);

        expect(returnedMessage).toEqual(errorMessage);
    });

    it('return the message passed in, in reverse', async () => {
        const message = 'test message';
        const reversedMessage = message.split('').reverse().join('');
        const returnedMessage = await lambdaExecutor.executeLambda(reverseLambda, message);

        expect(returnedMessage).toEqual(reversedMessage);
    });

});