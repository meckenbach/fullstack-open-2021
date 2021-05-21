describe('Blog app', function () {
  this.beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'root', name: 'Superuser', password: 's3cr3t' })
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'mle', name: 'Myself', password: 'mle123' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username')
        .type('root')

      cy.get('#password')
        .type('s3cr3t')

      cy.get('button')
        .click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username')
        .type('root')

      cy.get('#password')
        .type('lol')

      cy.get('button')
        .click()

      cy.contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login('root', 's3cr3t')
    })

    it('a blog can be created', function () {
      cy.contains('create new blog')
        .click()

      cy.get('#title')
        .type('Cypress Docs')

      cy.get('#author')
        .type('Cypress.io Team')

      cy.get('#url')
        .type('https://docs.cypress.io/')

      cy.get('form')
        .contains('create')
        .click()

      cy.contains('added Cypress')
        .should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('Cypress Docs Cypress.io Team')
    })

    describe('And when a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Cypress Docs', author: 'Cypress.io Team', url: 'https://docs.cypress.io/' })

        cy.get('.blog')
          .contains('view')
          .click()
      })

      it('it can be liked', function () {
        cy.get('.blog')
          .contains('likes 0')

        cy.contains('like')
          .click()

        cy.get('.blog')
          .contains('likes 1')
      })

      it('it can be removed by its creator', function () {
        cy.contains('remove')
          .click()
      })

      it('it cannot be removed other users', function () {
        cy.login('mle', 'mle123')

        cy.get('.blog')
          .contains('view')
          .click()

        cy.contains('remove')
          .should('not.exist')
      })
    })
  })
})