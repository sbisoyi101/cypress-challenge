/// <reference types="Cypress" />

describe('API specs', function() {

    it('Fetch median for positive input value', () => {
        cy.request('http://localhost:3000/api/10')
        .then((response) => {
          expect(response).property('status').to.equal(200);
          expect(response.body).property('median').to.be.a('array');
          expect(response.body.median).to.have.length(2);
          expect(response.body.median[0]).to.eq(3);
          expect(response.body.median[1]).to.eq(5);
        })
    })
  
    it('Fetch median for negative input value', () => {
      cy.request('http://localhost:3000/api/-10')
      .then((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).property('median').to.be.a('array');
        expect(response.body.median).to.have.length(2);
        expect(response.body.median[0]).to.eq(null);
        expect(response.body.median[1]).to.eq(null);
      })
  })
  
    it('Fetch median for input value 1 ', () => {
      cy.request('http://localhost:3000/api/1')
      .then((response) => {
        expect(response).property('status').to.equal(200)
        expect(response.body).property('median').to.be.a('array');
        expect(response.body.median).to.have.length(2);
        expect(response.body.median[0]).to.eq(null);
        expect(response.body.median[1]).to.eq(null);
      })
    })
  
    it('Fetch median for input value greater than 10000000', () => {
      cy.request('http://localhost:3000/api/10000001')
      .then((response) => {
        expect(response).property('status').to.equal(200);
        expect(response.body).to.include.keys('error')
        expect(response.body.error.message).to.eq('Number exceeds limit');
      })
    })
  })
  