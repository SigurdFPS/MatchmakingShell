**Matchmaking System**
This is a matchmaking system built to support cash-based matches for games like Call of Duty Warzone. Users can sign up, deposit funds into their wallets, create matches, and join other matches. This README provides an in-depth guide on setting up, running, and testing the application.

**Table of Contents**
  Project Overview
  Technologies Used 
  Features
  Installation
  Configuration
  Running the Application
  Testing
  Folder Structure
  API Documentation


**Project Overview**
  The Matchmaking System is a Node.js application with a React frontend that allows users to:

**Register and Login: Users can create accounts and log in securely.**
  Manage Wallets: Users can add funds to their wallet, view their balance, and see a transaction history.
  Create and Join Matches: Users can create matches and participate in other matches, with the wager amount deducted from their wallet balance.
  Leaderboard: Displays the top players based on their Elo rating or number of wins.

**Technologies Used**
  Backend: Node.js, Express.js, MongoDB (using Mongoose)
  Frontend: React, Axios
  Authentication: JWT (JSON Web Tokens)
  Database Testing: MongoMemoryServer for in-memory MongoDB
  Testing Frameworks: Jest, Supertest
  Environment Management: dotenv
**Features**
  User Management
    Register, login, and authentication using JWT.
    Password hashing for secure password storage.
  Wallet System
    Each user has a wallet where they can load funds and view their transaction history.
    Wallet balance is used for participating in cash-based matches.
  Matchmaking
    Users can create matches with different formats (1v1, 2v2, 3v3).
    Users can join matches if they have sufficient balance.
  Leaderboard
    Displays top players based on Elo ranking and other criteria.

  **Installation**
**Prerequisites**
Node.js (v14+)
MongoDB (local installation or cloud account for a production database)
Steps
Clone the Repository:

  git clone <your-repo-url>
    cd MatchmakingSystem
      Install Dependencies:

  npm install
    Set Up Environment Variables: Create a .env file in the root directory with the following environment variables:

    MONGO_URI=<your-mongodb-connection-string>
      JWT_SECRET=<your-jwt-secret>
        PORT=5000
        
**Set Up MongoDB:**
  If you’re using a local MongoDB instance, make sure it’s running.
    Alternatively, use a MongoDB cloud connection string in the .env file.
**Configuration**
  The project relies on environment variables specified in the .env file. Ensure that you’ve configured the following:
    MONGO_URI: Connection string for MongoDB (e.g., MongoDB Atlas).
    JWT_SECRET: Secret key for signing JWTs.
    PORT: Port on which the server runs.
    
**Running the Application**
  Start the Server:
    npm start
    The server will start on the port specified in the .env file (default is 5000).

**Frontend Setup (React):**
  - Navigate to the src folder and ensure all components and services are configured to call the API at the correct base URL.
    - Run the frontend using npm start if it's in a separate project setup.
  
**Testing**
  - The project includes a full suite of tests using Jest and Supertest. To test the application, you’ll need to ensure the MongoMemoryServer is installed for an isolated in-memory database.
    - Running Tests
      - Run All Tests:
        - npm test
    
**Test Explanation:**
  - _Unit Tests: Test individual components and functions in isolation._
    - Integration Tests: Ensure different parts of the system work together (e.g., checking balance before joining a match).
      - E2E Tests: Full flow tests using endpoints and simulated user actions.
  
**Test Files**
  - tests/auth.test.js: Tests registration and login functionality.
    - tests/match.test.js: Tests match creation, joining, and balance deduction.
      - tests/leaderboard.test.js: Tests retrieval of top players for the leaderboard.
        - tests/wallet.test.js: Tests wallet functions, including adding funds, viewing balance, and transaction history.
  
**Folder Structure**
  - Here’s an overview of the project’s folder structure and the purpose of each key file.

**MatchmakingSystem/**

  ├── config/
  
  │   └── db.js # Setup now for Supabase
  
  ├── controllers/
  
  │   ├── authController.js # Handles user authentication
  
  │   ├── matchFinderController.js # Manages match creation and joining
  
  │   ├── teamController.js          # Manages team creation and member management
  
  │   ├── userController.js          # Retrieves user profile and leaderboard
  
  │   └── walletController.js        # Handles wallet functionality (add funds, view balance)
  
  ├── middleware/
  
  │   └── authMiddleware.js          # Protects routes requiring authentication
  
  ├── models/
  
  │   ├── userModel.js               # Defines the user schema
  
  │   ├── matchModel.js              # Defines the match schema
  
  │   └── teamModel.js               # Defines the team schema
  
  ├── routes/
  
  │   ├── authRoutes.js              # Routes for authentication
  
  │   ├── matchFinderRoutes.js       # Routes for matchmaking functions
  
  │   ├── teamRoutes.js              # Routes for team management
  
  │   ├── userRoutes.js              # Routes for user profile and leaderboard
  
  │   └── walletRoutes.js            # Routes for wallet functions
  
  ├── src/
  
  │   ├── components/
  
  │   │   ├── AddFunds.js            # Component to add funds to wallet
  
  │   │   ├── WalletBalance.js       # Displays user balance
  
  │   │   └── TransactionHistory.js  # Displays transaction history
  
  │   └── services/
  
  │       ├── api.js                 # Configures Axios for API requests
  
  │       └── auth.js                # Auth API calls (login, register)
  
  ├── tests/
  
  │   ├── auth.test.js               # Tests for auth API
  
  │   ├── match.test.js              # Tests for match API
  
  │   ├── leaderboard.test.js        # Tests for leaderboard API
  
  │   └── wallet.test.js             # Tests for wallet functions
  
  ├── .env                           # Environment variables
  
  ├── server.js                      # Main server entry point
  
  └── package.json                   # Project dependencies and scripts

**API Documentation**
  Below is an overview of the main API routes in the project. Each route may require JWT authentication to ensure secure access.
  
**Authentication Routes (/api/auth)**
  - POST /register: Registers a new user.
    - POST /login: Logs in a user and returns a JWT.

**Wallet Routes (/api/wallet)**
  - POST /add-funds: Adds funds to the user’s wallet.
    - GET /balance: Retrieves the user’s current balance.
      - GET /transactions: Retrieves the user’s transaction history.

**Matchmaking Routes (/api/matches)**
  - POST /create: Creates a new match (requires sufficient balance).
    - POST /join: Joins an existing match (requires sufficient balance).

**Leaderboard Routes (/api/user/leaderboard)**
  - GET /leaderboard: Retrieves a list of top players by Elo rating.

**Additional Notes**
  - Environment Security: Ensure that .env is in .gitignore to avoid committing sensitive data to version control.
    - Database Initialization: If running in production, make sure MongoDB is properly configured and secured.
      - Error Handling: The current implementation provides basic error handling. For production, consider implementing custom error handlers.
