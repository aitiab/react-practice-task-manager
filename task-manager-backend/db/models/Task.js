// // Tell nodejs to load mongoose and store in const mongoose
// const mongoose = require('mongoose');

// // Create Schema
// // mongoose.Schema defines structure/schema of documents/records in MongoDB collection (fields, types, etc...).
// // new mongoose.Schema => create new instance of a schema
// const taskSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     description: {type: String},
//     isCompleted: {type: Boolean, default: false },
//     createdAt: {type: Date, default: Date.now}
// });


// // module.exports => special func in nodejs to export funcs, objs, values to other parts
// // mongoose.model() => tells mongoose to create model for 'Task' in my mongoDB using taskSchema
// // the/a model is higher-level abstract allowing interact with MongoDB... CURD e..g .save(), .find(), .findByID... 
// module.exports = mongoose.model('Task', taskSchema);

const { Model } = require('../objection'); // Import Model from Objection.js

// Creating a model (db table) for Tasks
// extend base class Model to inherit all methods 
class Task extends Model {
    // Define table name
    // tableName a static getter that tells objectionjs which model this table associated with
    // static get used to define class-level property wihout having to create an instance of the class
    static get tableName() { 
        return 'tasks'; // table name in sqlite db
    }

    // Define primary key column
    // idColumn a static getter that specifies which col to be used as primary key
    static get idColumn() {
        return 'id'; // primary key in users table
    }

    /* desired table
        CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        desc TEXT ,
        isCompleted BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    */

    // Defines expected structure of the data. good for validation
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title'], // fields required when inserting
            properties: {
                id: { type: 'integer' }, // Primary key
                title: { type: 'string' },
                desc: { type: 'string' },
                isCompleted: { type: 'boolean', default: false},
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            }
        };
    }

    $beforeInsert() {
        const timestamp = new Date().toISOString();

        this.createdAt = timestamp;
        this.updatedAt = timestamp;
    }

    $beforeUpdate() {
        const timestamp = new Date().toISOString();

        this.updatedAt = timestamp;
    }

}

module.exports = Task;