describe('Clear Wishlist Test', () => {

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
        cy.wait(5000)
        cy.get('[data-cy="profile-wishlist-tab"]', {timeout: 15000}).click()
        cy.location('href').should('contain', '/perfil/favoritos');
    })

    it('clears wishlist', () => {
        cy.get('[data-cy="wishlist-clear"]', {timeout: 15000}).click()
        cy.get('[data-cy="wishlist-clear-confirm"]', {timeout: 15000}).click()
        cy.get('[data-cy="wishlist-product-container"]', {timeout: 15000}).find('.product-card').should('have.length', 0)
    })

})