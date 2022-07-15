describe('Delete User Test', () => {
    it('visits website', () => {
        cy.viewport(1920, 1080)
        cy.visit("/login")
    })

    it('erases account', () => {
        // Getting e-mail forms
        cy.get('[data-cy="login-email"]').type("test@email.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()
        // Opening dropdown
        cy.get('[data-cy="navbar-dropdown"]', {
            timeout: 10000
        }).click()
        cy.get('[data-cy="navbar-profile"]').click()
        cy.location('href').should('contain', '/perfil');


        // Entering security area
        cy.get('[data-cy="profile-security-tab"]').click()

        // Obtaining and clicking delete button
        cy.get('[data-cy="profile-delete-account-button"]').scrollIntoView()
        cy.get('[data-cy="profile-delete-account-button"]').click()

        // Obtaining and typing code
        cy.get('[data-cy="profile-delete-account-code"]').then(($code) => {
            cy.wait(500)
            cy.get('[data-cy="profile-delete-account-code-input"]').type($code.text())
            cy.get('[data-cy="profile-delete-account-confirmation-button"').click()
        })
    })
})