describe('Product Test', () => {
  it('visits website', () => {
    cy.viewport(1920, 1080)

    // Visiting home-page
    cy.visit('/')

  })

  it('products load successfully', () => {
    // Checking if products have been properly loaded

    cy.get('[data-cy="product-container"]').find('div').its('length').should('be.gte', 1)  
  })
})