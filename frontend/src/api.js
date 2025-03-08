// axios is a promise-based http client to make http request from frontend to backend

// api.js is a api utlity

import axios from 'axios';

// Defining API URL
const API_URL = 'http://localhost:5000';

// Create an Axios Instance
const api = axios.create({
    baseURL: API_URL, // Append baseURL when making requests     
});