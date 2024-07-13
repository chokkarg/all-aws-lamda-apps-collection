/// <reference types="Cypress" />

import { IndexPage } from './pages/index';

describe('Reverse', () => {

    let indexPage;

    beforeEach(() => {
        indexPage = new IndexPage();
        indexPage.loadPage();
    });

    describe('Empty Value', () => {

        it('Return an error', () => {
            // Click the "reverse" button
            indexPage.clickReverseButton();
            // Check the response
            indexPage.getResponseDivFail().should('contain', getFailMessage());
        });

    });

    describe('Value', () => {

        it('Return the reverse value that was typed value', () => {
            const message = 'this is a test message';

            // Type into the message box
            indexPage.setMessageText(message);
            // Click the "reverse" button
            indexPage.clickReverseButton();
            // Check the response
            indexPage.getResponseDivSuccess().should('contain', getSuccessMessage(reverseString(message)));
        });

    });

});

/**
 * Gets the failure message.
 *
 * @return the failure message
 */
function getFailMessage() {
    return 'No "message" parameter detected';
}

/**
 * Gets the success message, based on the expected response
 *
 * @param {string} expectedResponse the expected response (reversed string)
 * @returns {string} the full expected response
 */
function getSuccessMessage(expectedResponse) {
    return `The response is: "${expectedResponse}"`;
}

/**
 * Reverses a string.
 *
 * @param {string} string the string to reverse.
 * @returns {string} the reverse of the string passed in
 */
function reverseString(string) {
    return (string || '').split('').reverse().join('');
}
