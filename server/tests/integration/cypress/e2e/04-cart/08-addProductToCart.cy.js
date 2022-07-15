Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Add Product to Cart Test', () => {
    it('adds first product to cart', () => {
        cy.viewport(1920, 1080)

        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@email.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()

        cy.get('.product-card', {timeout: 15000}).first().click()

        cy.wait(5000)
        cy.get('[data-cy="product-add-to-cart"]', {timeout: 15000}).scrollIntoView()
        cy.get('[data-cy="product-add-to-cart"]').click()
        cy.wait(1000)
    })
})