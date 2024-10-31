// File: cypress/integration/match_joining.spec.js
describe('Match Joining', () => {
    it('allows a user to join an open match', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password');
        cy.get('button').contains('Login').click();

        cy.visit('/matches');
        cy.get('.match-item').first().click();
        cy.get('button').contains('Join Match').click();

        cy.contains('Match joined successfully!');
    });
});
