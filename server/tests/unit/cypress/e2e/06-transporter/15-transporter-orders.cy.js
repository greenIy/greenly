describe('Order Management Page (as Transporter) Access Test', () => {

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
        cy.get('[data-cy="login-email"]').type("test@transporter.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()
    })

    it('enters dashboard (orders page)', () => {
        cy.get('[data-cy="navbar-dropdown"]', {timeout: 15000}).click()
        cy.get('[data-cy="navbar-dashboard-transporter"]', {timeout: 15000}).click()
        cy.wait(500)
        cy.location('href').should('contain', '/painel');
    })

    it('accesses archive area', () => {
        cy.get('[data-cy="dashboard-transporter-orders-archive"]', {timeout: 15000}).click()
        cy.wait(500)
        cy.location('href').should('contain', '/painel/historico');
    })
})