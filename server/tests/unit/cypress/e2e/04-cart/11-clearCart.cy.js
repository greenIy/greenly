Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Clear Cart Test', () => {

    before(() => {
        cy.clearLocalStorageSnapshot();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('login', () => {
        cy.viewport(1920, 1080)

        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@email.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()
    })

    it('enters cart page', () => {
        cy.get('[data-cy="navbar-cart"]', {timeout: 15000}).click()
        cy.location('href').should('contain', '/carrinho');
    })

    it('clears the cart', () => {
        cy.get('[data-cy="cart-clear-button"]', {timeout: 15000}).click()
        cy.get('[data-cy="cart-clear-confirm"]', {timeout: 15000}).click()
    })
})