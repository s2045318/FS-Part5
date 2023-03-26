describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs !!!')
  })
  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })
})