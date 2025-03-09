// to verify jwt token
const jwt = require('jsonwebtoken');
// env holds our jwt secret key lets pass it to process.env
require('dotenv').config();


// Lets get the model for task
const Task = require('../db/models/Task');
const { Query } = require('mongoose');


exports.getTasks = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) return res.status(401).json({message: "No token provided"});

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET); // Throws an error if fail to verify

        const tasks = await Task.query(); // Grab whole list

        res.json({Tasks: tasks, message:'Successfully GET Tasks'});
    } catch (err) {
        console.error(err);
        return res.status(401).json({message: err.message});
    }
};

exports.createTask = async (req, res) => {
    // Check proper authorisation then doing processing of creation
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({message: "No token provided"});


    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET); // Maybe could remove const decode =???

        const {title, desc} = req.body;
        const newTask = await Task.query().insert({title, desc}); // Hopeful the model's lifecycle hooks will handling adding remaining fields
        return res.status(201).json({message: 'Successfully created Task'});
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: err.message}) // Have to fix up proper status and proper message
    }
};

exports.completeTask = async (req, res) => {
    // first lets if they have token
    const token = req.header('Authorization').replace('Bearer ', ''); // Maybe these two statments should be func.DRY
    if (!token) return res.status(401).json({messsage: 'No token provided'});

    try {
        // lets auth before processing request
        jwt.verify(token, process.env.JWT_SECRET); // returns error if fails
        
        const { id } = req.params;
        
        const updatedTask = await Task.query().findById(id).patch({
            isCompleted: true
        });
        return res.status(201).json({message: 'Task successfully updated'});

    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
}