Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });


describe('Distribution Center Management Page Access Test', () => {
    it('accesses dashboard and distribution center area', () => {
        cy.viewport(1920, 1080)

        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@transporter.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()

        cy.get('[data-cy="navbar-dropdown"]', {timeout: 15000}).click()
        cy.get('[data-cy="navbar-dashboard-transporter"]', {timeout: 15000}).click()
        cy.wait(500)
        cy.location('href').should('contain', '/painel');

        cy.get('[data-cy="dashboard-transporter-centers-pill"]', {timeout: 15000}).click()
        cy.wait(500)
        cy.location('href').should('contain', '/painel/centros');

    })
})