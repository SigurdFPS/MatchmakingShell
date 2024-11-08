// File: cypress/integration/match_joining.spec.js

describe('Match Joining', () => {
    it('allows a user to join an open match', () => {
        cy.visit('/login');

        // Enter credentials and log in
        cy.get('input[name="email"]').type('test@example.com'); // Assuming Supabase uses email for login
        cy.get('input[name="password"]').type('password');
        cy.get('button').contains('Login').click();

        // Verify login was successful by checking redirection or presence of profile
        cy.url().should('include', '/profile'); // Ensure user is redirected to the profile or home

        // Visit matches page and attempt to join the first open match
        cy.visit('/matches');
        cy.get('.match-item').first().click();
        cy.get('button').contains('Join Match').click();

        // Confirm that the match join was successful
        cy.contains('Match joined successfully!');
    });
});
