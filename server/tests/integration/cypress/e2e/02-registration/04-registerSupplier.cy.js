describe('Register Supplier Test', () => {
    it('visits website', () => {
        cy.viewport(1920, 1080)

        // Visiting register page
        cy.visit('/registo')
    })

    it('selects supplier tab', () => {
        cy.get('[data-cy="register-supplier-pill"]').click()
    })

    it('types register data', () => {
        // Filling form with bogus data
        cy.get('[data-cy="supplier-first-name"]').type("Test")
        cy.get('[data-cy="supplier-last-name"]').type("Supplier")
        cy.get('[data-cy="supplier-email"]').type("test@supplier.com")
        cy.get('[data-cy="supplier-password"]').type("password")
        cy.get('[data-cy="supplier-repeat-password"]').type("password")
        cy.get('[data-cy="supplier-company-name"]').type("Test Supplier Company")
        cy.get('[data-cy="supplier-company-email"]').type("supplier@company.com")

    })

    it('accepts terms and conditions', () => {
        cy.get('[data-cy="supplier-accept-terms"]').click()
    })

    it('submits register data', () => {
        // Submitting
        cy.get('[data-cy="supplier-submit"]').click()
    })

    it('access profile page', () => {
        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@supplier.com")
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