// File: cypress/integration/user_flow_spec.js

describe('User Login and Match Creation', () => {
    it('should allow a user to log in and create a match', () => {
        cy.visit('/login');

        // Enter credentials and log in using email
        cy.get('input[name="email"]').type('test@example.com'); // Supabase generally uses email for login
        cy.get('input[name="password"]').type('password');
        cy.get('button').contains('Login').click();

        // Verify successful login by checking URL or profile page elements
        cy.url().should('include', '/profile');

        // Navigate to the match creation page
        cy.visit('/create-match');

        // Set up match details and create match
        cy.get('select').select('2');  // Select 2v2 format
        cy.get('input[placeholder="Wager Amount"]').type('10');
        cy.get('button').contains('Create Match').click();

        // Confirm match creation success
        cy.contains('Match created successfully!');
    });
});
