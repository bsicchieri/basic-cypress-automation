Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Ana').should('have.value', 'Ana')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva')
        cy.get('#email').type('ana@test.com').should('have.value', 'ana@test.com')
        cy.get('#open-text-area').type('Just a test, thanks!', { delay: 0 }).should('have.value', 'Just a test, thanks!')
        cy.get('button[type="submit"]').click()
})