// const mongoose = require('mongoose');

// // bcryptjs => lib for securely hash passwords and compare in auth
// const bcrypt = require('bcryptjs');

// // Defining a schema/structure for User document/record
// // define the fields of reach 'User' Record/document
// const userSchema = new mongoose.Schema({
//     username: { type: string, requird: true, unique: true },
//     password: { type: string, required: true}
// });

// // .pre('save', ...) is a mongoose middleware run before document/record is saved to db
// // async function (next) {...} define middleware function
// // next() allows save operation to proceed
// userSchema.pre('save', async function(next) {
//     // this refers to 'User' document (i.e. the User object)
//     // if password not modified no rehash -> next() to continue saving user doc
//     if (!this.isModified('password')) return next();
    
//     // bcrypt.genSalt(10) generates randomstring used when hashing
//     const salt = await bcrypt.genSalt(10);

//     this.password = await bcrypt.hash(this.password, salt);

//     next();
// });

// // Export module for use in other parts of app
// // mongoose.model creates Mongoose model for 'User' connection
// // the mongoose model represents structure of docs/records in 'users' collection in DB
// // allows CURD of collection (collections of User => 'users')
// module.exports = mongoose.model('User', userSchema);




const { Model } = require('../objection'); // Import Model from Objection.js

// bcryptjs => lib for securely hash passwords and compare in auth
const bcrypt = require('bcryptjs');

// Creating a model (db table) for Users
// extend base class Model to inherit all methods 
class User extends Model {
    // Define table name
    // tableName a static getter that tells objectionjs which model this table associated with
    // static get used to define class-level property wihout having to create an instance of the class
    static get tableName() { 
        return 'users'; // table name in sqlite db
    }

    // Define primary key column
    // idColumn a static getter that specifies which col to be used as primary key
    static get idColumn() {
        return 'id'; // primary key in users table
    }

    /* desired table
        CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    */

    // Defines expected structure of the data. good for validation
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password'], // fields required when inserting
            properties: {
                id: { type: 'integer' }, // Primary key
                username: { type: 'string', minlength: 3, maxLength: 255},
                password: { type: 'string', minlength: 6 },
                isActive: { type: 'boolean', default: true },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
            },
            //unique: ['username'],
        };
    }

    // lifecycle hook called before inserting new record
    async $beforeInsert() {
        const timestamp = new Date().toISOString();
        this.createdAt = timestamp;
        this.updatedAt = timestamp; 

        // Hash password before saving
        this.password = await this.hashPassword(this.password);
    }

    async $beforeUpdate() {
        this.updatedAt = new Date().toISOString();

        if (this.password !== this.$original.password) {
            this.password = await this.hashPassword(this.password);
        }
    }

    // Helper function to hash password
    async hashPassword (password) {
        // bcrypt.genSalt(10) generates randomstring used when hashing
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    // Additional method for comparing passwords
    static async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

}

module.exports = User;