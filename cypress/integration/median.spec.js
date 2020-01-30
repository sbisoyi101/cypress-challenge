/// <reference types="Cypress" />

describe('Test cases for validating prime numbers median value', function() {
    //Any decimal number that is 2 to 10000000 returns valid median value
    //Any decimal number that is less than 2 returns null median value
    //Any decimal number that is more than 10000000 returns error message
    //Any number less than 3 returns null median value
    //Any number 3 to 10000000 returns valid median value
    //Any number more than 10000000 returns error message
 
    it('Entering decimal input should produce a valid median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(2.1)
       // a better approach is to add "data-cy" attribute to the input element. Ex: <input type="number" data-cy="number">
       // cy.get('[data-cy=number]').type(2.1)
       cy.get('button').click() // cy.get('[data-cy=button]').click()
       cy.get('h2').should('have.text', 'The median is: [2]')
    })
 
    it('Entering big decimal input should produce a valid median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(9005.678905666789) // cy.get('[data-cy=number]')
       cy.get('button').click() // cy.get('[data-cy=button]')
       cy.get('h2').should('have.text', 'The median is: [4051,4057]')
    })
 
    it('Entering "10000000.9999990" should show an error', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(10000000.9999990)
    
       const stub = cy.stub()
       cy.on('window:alert', stub)      
       cy.get('button').click()
       .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('Number exceeds limit') 
    })
    })
 
    it('Entering "1.78" should produce a null value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(1.78)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [,]') 
    })
 
    it('Entering "-14567688.567" should produce a null value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(-14567.567)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [,]')
    })
 
    it('Entering "2" should yield a null median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(2)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [,]')
    })
   
   it('Entering "-433" should yield a null median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(-433)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [,]')
    })
   
   it('Entering "5678e-567890" should yield a null median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(5678e-567890)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [,]')
    })
   
   it('Entering "3" should produce a valid median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(3)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [2]')
    })
   
   it('Entering "571" should produce a valid median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(571)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [239,241]')
    })
   
   it('Entering "7890" should produce a valid median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(7890)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [3559]')
    })
   
   it('Entering "10000000" should produce a valid median value', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(10000000)
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [4751053]')
   })
     
   it('Entering "10000001" should show an error', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(10000001)
   
       const stub = cy.stub()
       cy.on('window:alert', stub)      
       cy.get('button').click()
         .then(() => {
         expect(stub.getCall(0)).to.be.calledWith('Number exceeds limit')    
       })
   })
   
   it('Entering "100e24" should show an error', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(100e24)
       
       const stub = cy.stub()
       cy.on('window:alert', stub)      
       cy.get('button').click()
         .then(() => {
         expect(stub.getCall(0)).to.be.calledWith('Number exceeds limit')
       })
   })
 
   it('Validating "1000" plus 1 using Up arrow', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(1000)
       .get('input').type('{uparrow}')
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [433,439]')
    })
 
    it('Validating "1000" minus 1 using down arrow', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(1000)
       .get('input').type('{downarrow}')
       cy.get('button').click()
       cy.get('h2').should('have.text', 'The median is: [433,439]')
       .wait(2000)
    }) 
       
    it('Entering special chars "9-+4" should show an error', function() {
       cy.visit("http://localhost:3000/")
       cy.get('input').type(9+-4)
       cy.wait(2000)
       cy.get('button').click() 
       //No api request is being sent and no element locator is visible for the tooltip seen
       //An error message should be seen: "Please enter a number"
    })
 })
 