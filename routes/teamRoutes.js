// File: routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/create', teamController.createTeam);
router.post('/add-member', teamController.addMember);

module.exports = router;
