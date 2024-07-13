/// <reference types="Cypress" />

import { IndexPage } from './pages/index';

describe('Echo', () => {

    let indexPage;

    beforeEach(() => {
        indexPage = new IndexPage();
        indexPage.loadPage();
    });

    describe('Empty Value', () => {

        it('Return an empty value', () => {
            // Click the "echo" button
            indexPage.clickEchoButton();
            // Check the response
            indexPage.getResponseDivSuccess().should('contain', getSuccessMessage(''));
        });

    });

    describe('Value', () => {

        it('Return the value that was typed value', () => {
            const message = 'this is a test message';

            // Type into the message box
            indexPage.setMessageText(message);
            // Click the "echo" button
            indexPage.clickEchoButton();
            // Check the response
            indexPage.getResponseDivSuccess().should('contain', getSuccessMessage(message));
        });

    });

});

/**
 * Gets the success message, based on the expected response
 *
 * @param {string} expectedResponse the expected response (reversed string)
 * @returns {string} the full expected response
 */
function getSuccessMessage(expectedResponse) {
    return `The response is: "${expectedResponse}"`;
}
