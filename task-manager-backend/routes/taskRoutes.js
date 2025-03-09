const express = require('express')

// express.router modularise routes into separate modules
const router = express.Router();
const taskController = require('../controllers/taskController');
const { route } = require('./userRoutes');


// Define Routes
router.get('', taskController.getTasks); // GET as caching and no mods just retrieveing
router.post('', taskController.createTask);
router.put('/:id', taskController.completeTask); // :param-name (route parameter)
router.delete('/:id', taskController.deleteTask);

module.exports = router;