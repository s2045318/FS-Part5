describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('Blogs !!!')
  })
  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })
  describe('login', function() {
    beforeEach(function() {
      const user = { username:'mluukkai', password:'salainen', realname:'Matti' }
      cy.request('POST', 'http://localhost:3003/api/users/',user)
    })
    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('hacker')
      cy.get('#password').type('mcGee')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
    it('user can login', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Welcome Back Matti')
    })
  })
})