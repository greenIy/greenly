describe('Login Test', () => {
  it('visits website', () => {
    cy.viewport(1920, 1080)

    // Visiting home-page
    cy.visit('/')
  })

  it('finds login button', () => {
    // Locating and clicking login button
    cy.get("a[href='/login']").first().click()
  })

  it('types login data', () => {
    // Getting e-mail forms
    cy.get('[data-cy="login-email"]').type(Cypress.env().consumer.email)
    cy.get('[data-cy="login-password"]').type(Cypress.env().consumer.password)

  })

  it('submits login data', () => {
    // Submitting
    cy.get('[data-cy="login-submit"]').click()
  })

  it('access profile page', () => {
    // Opening dropdown
    cy.get('[data-cy="navbar-dropdown"]', {
      timeout: 10000
    }).click()
    cy.get('[data-cy="navbar-profile"]').click()
    cy.location('href').should('contain', '/perfil');

  })
})