describe('Register Consumer Test', () => {
    it('visits website', () => {
        cy.viewport(1920, 1080)

        // Visiting register page
        cy.visit('/registo')
    })

    it('types register data', () => {
        // Filling form with bogus data
        cy.get('[data-cy="consumer-first-name"]').type("Test")
        cy.get('[data-cy="consumer-last-name"]').type("Consumer")
        cy.get('[data-cy="consumer-email"]').type("test@email.com")
        cy.get('[data-cy="consumer-password"]').type("password")
        cy.get('[data-cy="consumer-repeat-password"]').type("password")
    })

    it('accepts terms and conditions', () => {
        cy.get('[data-cy="consumer-accept-terms"]').click()
    })

    it('submits register data', () => {
        // Submitting
        cy.get('[data-cy="consumer-submit"]').click()
    })

    it('access profile page', () => {
        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@email.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()

        // Opening dropdown
        cy.get('[data-cy="navbar-dropdown"]', {
            timeout: 10000
        }).click()
        cy.get('[data-cy="navbar-profile"]').click()
        cy.location('href').should('contain', '/perfil');
    })
})