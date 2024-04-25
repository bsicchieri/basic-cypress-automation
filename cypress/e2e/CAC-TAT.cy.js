/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it.skip('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!', { delay: 0 }).should('have.value', 'Apenas um teste, obrigado!')

        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it.skip('Exibe a mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('brunoteste.com').should('have.value', 'brunoteste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!', { delay: 0 }).should('have.value', 'Apenas um teste, obrigado!')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.skip('Valida o envio de valores não-numéricos no campo telefone', () => {
        cy.get('#phone')
            .type('teste')
            .should('not.have.value', 'teste')
            .should('have.value', '')
    })

    it.skip('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!').should('have.value', 'Apenas um teste, obrigado!')

        cy.get('[type="checkbox"]').check('phone').should('be.checked')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.skip('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno').clear().should('have.value', '')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com').clear().should('have.value', '')
        cy.get('#phone').type('9999999').should('have.value', '9999999').clear().should('have.value', '')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!').should('have.value', 'Apenas um teste, obrigado!').clear().should('have.value', '')
    })

    it.skip('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.skip('Envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it.skip('Valida o click no botão com Contains', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com')
        cy.get('#open-text-area').type('Apenas um teste, obrigado!', { delay: 0 }).should('have.value', 'Apenas um teste, obrigado!')

        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it.skip('Seleciona um produto "Youtube" por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it.skip('Seleciona um produto "Mentoria" por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it.skip('Seleciona um produto "Blog" por seu índice (1)', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it.skip('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it.skip('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it.skip('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it.skip('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido', () => {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno')
        cy.get('#lastName').type('Teste').should('have.value', 'Teste')
        cy.get('#email').type('bruno@teste.com').should('have.value', 'bruno@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Apenas um teste, obrigado!').should('have.value', 'Apenas um teste, obrigado!')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.skip('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it.skip('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it.skip('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { encoding: null }).as('exampleFile')
        cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it.skip('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })   
    
    it.skip('Acessa a página de política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    

})