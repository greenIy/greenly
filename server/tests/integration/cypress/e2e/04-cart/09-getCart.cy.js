describe('Get Cart Test', () => {
    it('accesses and views cart', () => {
        cy.viewport(1920, 1080)

        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@email.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()
        
        cy.wait(5000)
        cy.get('[data-cy="navbar-cart"]', {timeout: 15000}).click()
        cy.location('href').should('contain', '/carrinho');
    })
})