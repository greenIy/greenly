Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Add Product to Cart Test', () => {

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

    it('enters first product', () => {
        cy.get('.product-card', {timeout: 15000}).first().click()
    })

    it('finds "add to cart" button', () => {
        cy.get('[data-cy="product-add-to-cart"]', {timeout: 15000}).scrollIntoView()
        cy.get('[data-cy="product-add-to-cart"]').click()
        cy.wait(1000)

    })  
})