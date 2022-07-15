describe('Register Transporter Test', () => {
    it('visits website', () => {
        cy.viewport(1920, 1080)

        // Visiting register page
        cy.visit('/registo')
    })

    it('selects transporter tab', () => {
        cy.get('[data-cy="register-transporter-pill"]').click()
    })

    it('types register data', () => {
        // Filling form with bogus data
        cy.get('[data-cy="transporter-first-name"]').type("Test")
        cy.get('[data-cy="transporter-last-name"]').type("Transporter")
        cy.get('[data-cy="transporter-email"]').type("test@transporter.com")
        cy.get('[data-cy="transporter-password"]').type("password")
        cy.get('[data-cy="transporter-repeat-password"]').type("password")
        cy.get('[data-cy="transporter-company-name"]').type("Test Transporter Company")
        cy.get('[data-cy="transporter-company-email"]').type("transporter@company.com")

    })

    it('accepts terms and conditions', () => {
        cy.get('[data-cy="transporter-accept-terms"]').click()
    })

    it('submits register data', () => {
        // Submitting
        cy.get('[data-cy="transporter-submit"]').click()
    })

    it('access profile page', () => {
        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@transporter.com")
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