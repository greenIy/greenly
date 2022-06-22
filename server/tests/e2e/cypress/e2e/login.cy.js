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
    cy.get("input[type='email']").first().type("test@test.com")
    cy.get("input[type='password']").first().type("teste")

  })

  it('submits login data', () => {
    // Submitting
    cy.get("#loginButton").click()
  })

  it('access profile page', () => {
    // Opening dropdown
    cy.get(".dropdown-toggle", {
      timeout: 10000
    }).first().click()
    cy.get("a[href='/perfil/detalhes']").first().click()

    cy.location('href').should('contain', '/perfil');

  })
})