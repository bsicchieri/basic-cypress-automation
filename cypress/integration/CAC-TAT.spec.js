/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    
    it('Verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!', { delay: 0 }).should('have.value', 'Apenas um teste, obrigado!')

        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe a mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('brunoteste.com').should('have.value', 'brunoteste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!', { delay: 0 }).should('have.value', 'Apenas um teste, obrigado!')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Validar o envio de valores não-numéricos no campo telefone', () => {
        cy.get('#phone')
            .type('teste')
            .should('not.have.value', 'teste')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!').should('have.value', 'Apenas um teste, obrigado!')

        cy.get('[type="checkbox"]').check('phone').should('be.checked')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno').clear().should('have.value', '')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com').clear().should('have.value', '')
        cy.get('#phone').type('9999999').should('have.value', '9999999').clear().should('have.value', '')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!').should('have.value', 'Apenas um teste, obrigado!').clear().should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Validar click no botão com Contains', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!', { delay: 0 }).should('have.value', 'Apenas um teste, obrigado!')

        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
})