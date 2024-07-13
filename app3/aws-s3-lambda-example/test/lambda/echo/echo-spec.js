const echoLambda = require('../../../app/lambda/echo/index');
const lambdaExecutor = require('../lambdaExecutor');

describe('Lambda: echo', () => {

    it('return the empty string when the empty string is passed in', async () => {
        const message = '';
        const returnedMessage = await lambdaExecutor.executeLambda(echoLambda, message);

        expect(returnedMessage).toEqual(message);
    });

    it('return the message passed in', async () => {
        const message = 'test message';
        const returnedMessage = await lambdaExecutor.executeLambda(echoLambda, message);

        expect(returnedMessage).toEqual(message);
    });

});