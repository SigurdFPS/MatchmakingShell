// File: routes/walletRoutes.js
const express = require('express');
const walletController = require('../controllers/walletController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensures user is authenticated

const router = express.Router();

router.post('/add-funds', authMiddleware, walletController.addFunds);
router.get('/balance', authMiddleware, walletController.getBalance);
router.get('/transactions', authMiddleware, walletController.getTransactionHistory);

module.exports = router;
