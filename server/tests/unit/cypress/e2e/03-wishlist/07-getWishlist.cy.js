describe('Get Wishlist Test', () => {

    before(() => {
        cy.clearLocalStorageSnapshot();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('access profile page', () => {
        cy.viewport(1920, 1080)

        // Getting e-mail forms
        cy.visit("/login")
        cy.get('[data-cy="login-email"]').type("test@email.com")
        cy.get('[data-cy="login-password"]').type("password")
        cy.get('[data-cy="login-submit"]').click()

        // Opening dropdown
        cy.get('[data-cy="navbar-dropdown"]', {
            timeout: 10000
        }).click()
        cy.get('[data-cy="navbar-profile"]', {timeout: 15000}).click()
        cy.location('href').should('contain', '/perfil');
    })

    it('enters wishlist page', () => {
        cy.get('[data-cy="profile-wishlist-tab"]', {timeout: 15000}).click()
        cy.location('href').should('contain', '/perfil/favoritos');
    })

})