// Imported Modules
const express = require('express');

const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
/*
It provides features like defining models, 
managing database connections, and performing CRUD (Create, Read, Update, Delete) operations.
*/
// const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import env variables from .env into process.env
dotenv.config();

// Create application. express() returns Express app object. app is instance of a express app object
const app = express();

// Added middleware with app.use()
app.use(cors())
app.use(express.json()); // Middleware for parsing JSON requests -> js object
// Middleware is a func with access to the req, res, and next func in app's req/res cycle

// tells express app to use middleware func for incoming reqs to certain path (base path '/user)
// userRoutes uses express.Router
app.use('/user', userRoutes)
app.use('/tasks', taskRoutes)


// // mongoose.connect(<MONGODB URL>, {OPTIONS FOR CONNECTION}) connect to MongoDB 
// // useNewURLParser => Mongoose use MongoDB's new URL string parser
// // useUnifiedTopology => use new unified topology engine in MongoDB driver.
// mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => console.log('Connected to MongoDB')) // Promise callback run after successful connection
//     .catch((err) => console.log(err));

// app.listen() => start express server and start listening for incoming requests on port 5000
// () => is callback func run after successful start listening
app.listen(5000, () => {
    console.log('Server running on port 5000');
});

