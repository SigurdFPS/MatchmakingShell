// File: routes/matchFinderRoutes.js
const express = require('express');
const router = express.Router();
const matchFinderController = require('../controllers/matchFinderController');

router.post('/create', matchFinderController.createMatch);      // Endpoint to create a match
router.post('/join', matchFinderController.joinMatch);          // Endpoint to join an open match
router.get('/find', matchFinderController.findMatches);         // Endpoint to find matches based on filters

module.exports = router;
