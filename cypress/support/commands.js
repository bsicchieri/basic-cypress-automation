Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!', { delay: 0 }).should('have.value', 'Apenas um teste, obrigado!')
        cy.get('button[type="submit"]').click()
})