// File: cypress/integration/user_flow_spec.js

describe('User Login and Match Creation', () => {
    it('should allow a user to log in and create a match', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password');
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/profile');

        cy.visit('/create-match');
        cy.get('select').select('2');  // 2v2 match format
        cy.get('input[placeholder="Wager Amount"]').type('10');
        cy.get('button').contains('Create Match').click();
        cy.contains('Match created successfully!');
    });
});
