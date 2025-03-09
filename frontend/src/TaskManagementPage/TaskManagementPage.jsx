import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from './TaskManagementPage.module.css'


// Declare functionl component
const TaskManagementPage = () => {
    // Defining state variables to make a controlled component
    const [tasks, setTasks] = useState([]); // State to store tasks
    const [taskName, setTaskName] = useState(''); // State to store new task name
    const [taskDesc, setTaskDesc] = useState(''); // State to store new task desc
    
    const [error, setError] = useState(''); // for error message

    const navigate = useNavigate(); // For navigating if user is not authenticated


    // Function to fetch tasks from backend
    const url = 'http://localhost:5000/tasks';
    const fetchTasks = async () => {
        try {
            // get user's token for verifying authenticatoin
            const token = localStorage.authToken;
            if (!token) {
                navigate('/'); // Redirect to login if no token
            }
            
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setTasks(response.data.tasks)
            console.log(tasks);
        } catch(err) {
            setError('Error fetching tasks')
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []); // Runs once

    // Handle adding new task
    const handleAddTask = async (event) => {
        event.preventDefault();
        if (!taskName.trim()) return; // If empty do nothing

        try {
            const token = localStorage.authToken;
            
            const response = await axios.post(url, 
                { title: taskName, desc: taskDesc }, // Data
                { headers: { // config
                    Authorization: `Bearer ${token}` 
                    }
                }
            );

            setTaskName('');
            setTaskDesc('');
            
            fetchTasks();
        } catch (err) {
            setError('Error adding task');
        }   
    };

    // Handle marking a task as complete
    const handleCompleteTask = async (event, taskId) => {
        event.preventDefault();
        // Update complete status in backend
        try {
            const token = localStorage.authToken;
            const response = await axios.put(`${url}/${taskId}`,
                { isCompleted: true },
                { headers: { Authorization: `Bearer ${token}`}}
            );
            console.log(response);

            fetchTasks();
        } catch (err) {
            setError('Error updating task')
        }
    };

    // Handle deleteing a task
    const handleDeleteTask = async (event, taskId) => {
        event.preventDefault();

        try {
            const response = await axios.delete(`${url}/${taskId}`,
                { headers: { Authorization: `Bearer ${localStorage.authToken}`}} // Probs should not repeat localStorage...
            );
            // Update new list of tasks
            fetchTasks();
        } catch (err) { // TBD: Display proper error messages from API
            setError('Error deleting task')
        }
    };

    // Now lets return the component
    return (
        <div className={styles.container}>
            <h2>
                Task Manager
            </h2>
            <form onSubmit={handleAddTask}>
                <label>Task Title:</label>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter Task Name"
                    required
                />
                <label>Task Description</label>
                <input
                    type='text'
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    placeholder="Enter Task Description"
                />
                <button type='submit'>Add Task</button>
            </form>

            <ul>
                
                {Array.isArray(tasks) && tasks.map((task) => (
                    <li key={task.id}>
                        <p>{task.title}</p>
                        <p>{task.desc}</p>
                        <button onClick={(e) => handleCompleteTask(e, task.id)}>
                            {task.completed ? 'Completed' : 'Mark as complete'}
                        </button>
                        <button onClick={(e) => handleDeleteTask(e, task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManagementPage;