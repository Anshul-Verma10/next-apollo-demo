/// <reference types="cypress" />

describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true);
    });
  
    it('looks inside the head content using `cy.document()`', () => {
      // yields the window.document object
      // if you click on DOCUMENT from the command log,
      // it outputs the entire #document to the console
      cy.document();
    });
  
    describe('Users page', () => {
      beforeEach(() => {
        // runs before each test in the block
        cy.visit('http://localhost:3000/app');
      });
  
      it('renders user details', () => {
        cy.get('[data-test-id="users-list"]').children();
      });
      it('renders 20 users on load', () => {
        cy.get('[data-test-id="users-list"]').children().should('have.length', 20)
      });
  
      it("has a 'Load More' button", () => {
        cy.get('button').should('have.text', ' Load more ');
      });
      
      it("Load More button click loads next 20 records and page scroll down to display new records", () => {
        cy.get('[data-test-id="users-action-loadMore"]').click();
        cy.get('[data-test-id="users-list"]').children().should('have.length', 40);
      });
    });
  });