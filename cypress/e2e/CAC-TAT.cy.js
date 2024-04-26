/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html') // https://cac-tat.s3.eu-central-1.amazonaws.com/index.html
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Fill in the required fields and submit the form', () => {
        cy.clock()

        cy.get('#firstName').type('Ana').should('have.value', 'Ana')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva')
        cy.get('#email').type('ana@test.com').should('have.value', 'ana@test.com')
        cy.get('#open-text-area').type('Just a test, thanks!', { delay: 0 }).should('have.value', 'Just a test, thanks!')

        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('Displays an error message when submitting the form with an email with invalid formatting', () => {
        cy.clock()
        
        cy.get('#firstName').type('Ana').should('have.value', 'Ana')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva')
        cy.get('#email').type('anasilva.com').should('have.value', 'anasilva.com')
        cy.get('#open-text-area').type('Just a test, thanks!', { delay: 0 }).should('have.value', 'Just a test, thanks!')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('Validates the sending of non-numeric values ​​in the telephone field', () => {
        cy.get('#phone')
            .type('test')
            .should('not.have.value', 'test')
            .should('have.value', '')
    })

    it('Displays an error message when the telephone number becomes mandatory but is not filled in before submitting the form', () => {
        cy.clock()
        
        cy.get('#firstName').type('Ana').should('have.value', 'Ana')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva')
        cy.get('#email').type('ana@test.com').should('have.value', 'ana@test.com')
        cy.get('#open-text-area').type('Just a test, thanks!').should('have.value', 'Just a test, thanks!')

        cy.get('[type="checkbox"]').check('phone').should('be.checked')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('Fill in and clear the name, surname, email and telephone fields', () => {
        cy.get('#firstName').type('Ana').should('have.value', 'Ana').clear().should('have.value', '')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
        cy.get('#email').type('ana@test.com').should('have.value', 'ana@test.com').clear().should('have.value', '')
        cy.get('#phone').type('9999999').should('have.value', '9999999').clear().should('have.value', '')
        cy.get('#open-text-area').type('Just a test, thanks!').should('have.value', 'Just a test, thanks!').clear().should('have.value', '')
    })

    it('Displays an error message when submitting the form without filling in the required fields', () => {
        cy.clock()
        
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('Submits the form successfully using a custom command', () => {
        cy.clock()
        
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('Validates the click on the button with Contains', () => {
        cy.clock()

        cy.get('#firstName').type('Ana').should('have.value', 'Ana')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva')
        cy.get('#email').type('ana@test.com').should('have.value', 'ana@test.com')
        cy.get('#open-text-area').type('Just a test, thanks!', { delay: 0 }).should('have.value', 'Just a test, thanks!')

        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('Select a "Youtube" product by its text', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('Select a "Mentoring" product by its value (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('Select a "Blog" product by its index (1)', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('Select the type of service "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('Mark each type of service', () => {
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Check both boxes, then uncheck the last one', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it('Displays error message when phone number becomes mandatory but is not filled in', () => {
        cy.clock()
        
        cy.get('#firstName').type('Ana').should('have.value', 'Ana')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva')
        cy.get('#email').type('ana@test.com').should('have.value', 'ana@test.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Just a test, thanks!').should('have.value', 'Just a test, thanks!')

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('Select a file from the fixtures folder', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Select a file by simulating drag-and-drop', () => {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Selects a file using a fixture that has been given an alias', () => {
        cy.fixture('example.json', { encoding: null }).as('exampleFile')
        cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Check that the privacy policy opens in another tab without the need for a click', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })   
    
    it('Access the privacy policy page by removing the target and then clicking on the link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('Display and hide success and error messages using .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('Fill the text area using the invoke command', () => {
        const longText = Cypress._.repeat('Test ', 20)
        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
    })

    it('Make an HTTP request', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should((response) => {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it('Challenge', () => {
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
    })

})