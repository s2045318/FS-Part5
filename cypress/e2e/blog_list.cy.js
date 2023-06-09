describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('Blogs !!!')
  })
  it('Login form is shown', function() {
    cy.contains('login').click()
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
      cy.contains('logout').click()
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      const user = { username:'mluukkai', password:'salainen', realname:'Matti' }
      cy.request('POST', 'http://localhost:3003/api/users/',user)
      cy.request('POST', 'http://localhost:3003/api/login',
        { username:'mluukkai', password:'salainen', realname:'Matti' })
        .then((response) => {
          localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('create new blog').click()
      cy.get('#blog-title').type('Fridge Chocolate')
      cy.get('#blog-author').type('Stacy')
      cy.get('#blog-url').type('http://boobobobobo.comcomcom')
      cy.get('#blog-submit').click()
    })
    afterEach(function() {
      cy.contains('logout').click()
    })

    it('A blog can be created', function() {
      cy.get('html').should('contain', 'Fridge Chocolate by Stacy')
    })
    it('User can like a blog', function () {
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('likes: 1')
    })
    it('the correct user can delete a blog', function () {
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'Fridge Chocolate by Stacy')
    })
    it('the wrong user cannot delete a blog', function() {
      cy.contains('logout').click()
      const user = {
        username : 'wheatyBiscuits',
        realname : 'max',
        password : 'milk&sugar'
      }
      cy.request('POST', 'http://localhost:3003/api/users/',user)
      cy.request('POST', 'http://localhost:3003/api/login',
        user)
        .then((response) => {
          localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('html').should('contain', 'Fridge Chocolate by Stacy')
    })

    it('checks that the blogs are ordered according to likes with the blog with the most likes being first', function() {
      cy.contains('create new blog').click()
      cy.get('#blog-title').type('Raspberry Fields')
      cy.get('#blog-author').type('Lindsey Wellington')
      cy.get('#blog-url').type('http://jam,toast')
      cy.get('#blog-submit').click()

      // Like the first blog three times
      cy.get('.default-view')
        .contains('Fridge Chocolate')
        .contains('view')
        .click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()

      // Like the second blog once
      cy.get('.default-view')
        .contains('Raspberry Fields')
        .contains('view')
        .click()
      cy.contains('like').click()

      // Check that the blogs are ordered by likes, with the most liked blog at the top
      cy.get('#blog-item')
        .eq(0)
        .contains('Fridge Chocolate')
      cy.get('#blog-item')
        .eq(1)
        .contains('Raspberry Fields')
    })

  })
})