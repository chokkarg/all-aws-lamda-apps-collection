/// <reference types="Cypress" />

import { IndexPage } from './pages/index';

describe('Uppercase', () => {

    let indexPage;

    beforeEach(() => {
        indexPage = new IndexPage();
        indexPage.loadPage();
    });

    describe('Empty Value', () => {

        it('Return an error', () => {
            // Click the "uppercase" button
            indexPage.clickUppercaseButton();
            // Check the response
            indexPage.getResponseDivFail().should('contain', getFailMessage());
        });

    });

    describe('Value', () => {

        it('Return the uppercase value that was typed value', () => {
            const message = 'this is a test message';

            // Type into the message box
            indexPage.setMessageText(message);
            // Click the "uppercase" button
            indexPage.clickUppercaseButton();
            // Check the response
            indexPage.getResponseDivSuccess().should('contain', getSuccessMessage(uppercaseString(message)));
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
 * @param {string} expectedResponse the expected response (uppercaseded string)
 * @returns {string} the full expected response
 */
function getSuccessMessage(expectedResponse) {
    return `The response is: "${expectedResponse}"`;
}

/**
 * Uppercases a string.
 *
 * @param {string} string the string to uppercase.
 * @returns {string} the uppercased string of the string passed in
 */
function uppercaseString(string) {
    return (string || '').toUpperCase();
}
