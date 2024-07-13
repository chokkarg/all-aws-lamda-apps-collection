const ENVIRONMENT_KEY_BASEURL = 'baseurl';
const SELECTOR_MESSAGE_INPUT = '#message';
const SELECTOR_ECHO_BUTTON = '#echo';
const SELECTOR_REVERSE_BUTTON = '#reverse';
const SELECTOR_UPPERCASE_BUTTON = '#uppercase';
const SELECTOR_RESPONSE_DIV = '#form-response';
const SELECTOR_RESPONSE_SUCCESS_CLASS = '.alert.alert-success';
const SELECTOR_RESPONSE_FAIL_CLASS = '.alert.alert-danger';

/**
 * This class exists as an API to the index page. All knowledge
 * of the page resides here (how to get the components, for example).
 *
 * Use this class as programatic access to the page.
 */
export class IndexPage {

    /**
     * Loads the page.
     */
    loadPage() {
        cy.visit(Cypress.env(ENVIRONMENT_KEY_BASEURL));
    }

    /**
     * Sets the value for the message input.
     *
     * @param {string} value the message to write
     */
    setMessageText(value) {
        this.getMessageInput().clear().type(value);
    }

    /**
     * Clicks the "echo" button.
     */
    clickEchoButton() {
        this.getEchoButton().click();
    }

    /**
     * Clicks the "reverse" button.
     */
    clickReverseButton() {
        this.getReverseButton().click();
    }

    /**
     * Clicks the "uppercase" button.
     */
    clickUppercaseButton() {
        this.getUppercaseButton().click();
    }


    /**
     * Gets the "message" DOM element.
     *
     * @return {Element} the "message" element
     */
    getMessageInput() {
        return cy.get(SELECTOR_MESSAGE_INPUT);
    }

    /**
     * Gets the "echo" DOM element.
     *
     * @return {Element} the "echo" element
     */
    getEchoButton() {
        return cy.get(SELECTOR_ECHO_BUTTON);
    }

    /**
     * Gets the "reverse" DOM element.
     *
     * @return {Element} the "reverse" element
     */
    getReverseButton() {
        return cy.get(SELECTOR_REVERSE_BUTTON);
    }

    /**
     * Gets the "uppercase" DOM element.
     *
     * @return {Element} the "uppercase" element
     */
    getUppercaseButton() {
        return cy.get(SELECTOR_UPPERCASE_BUTTON);
    }

    /**
     * Gets the "response" DOM element.
     *
     * @return {Element} the "response" element
     */
    getResponseDiv() {
        return cy.get(SELECTOR_RESPONSE_DIV);
    }

    /**
     * Gets the "success response" DOM element.
     *
     * @return {Element} getResponseDivSuccess the "success response" element
     */
    getResponseDivSuccess() {
        return this.getResponseDiv().find(SELECTOR_RESPONSE_SUCCESS_CLASS);
    }

    /**
     * Gets the "fail response" DOM element.
     *
     * @return {Element} the "fail response" element
     */
    getResponseDivFail() {
        return this.getResponseDiv().find(SELECTOR_RESPONSE_FAIL_CLASS);
    }

}