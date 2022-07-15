describe('Add Product to Wishlist Test', () => {
    it('adds product to wishlist', () => {
        cy.viewport(1920, 1080)

        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@email.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()

        cy.wait(5000)
        cy.get('.product-card', {timeout: 15000}).first().click()

        cy.wait(5000)
        cy.get('[data-cy="product-add-to-wishlist"]').scrollIntoView()
        cy.get('[data-cy="product-add-to-wishlist"]', {timeout: 15000}).click()

    })
})