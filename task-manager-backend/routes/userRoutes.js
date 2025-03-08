// A router

const express = require('express');

// express.router modularise routes into separate modules
const router = express.Router(); 
const userController = require('../controllers/userController')

// Define routes
router.post('/login', userController.login)


module.exports = router;    