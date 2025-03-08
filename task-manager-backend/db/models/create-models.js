// knex and objectionjs create db file but not the tables automatically
// better to use migration. TBD: MIgration
const knex = require('../knex');

//create users table


 /* desired table
        CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT UNIQUE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
*/

knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary(); // Auto-increment primary key
    table.string('username').unique().notNullable(); // unique, not nullable 
    table.string('password').unique().notNullable(); // unique, not nullable + needs to include minlength
    table.boolean('isActive').defaultTo(true);
    table.string('createdAt'); // should it be .timestamp() ?
    table.string('updatedAt');
})
    .then(() => {
        console.log('Users table created or already exists');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });

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

knex.schema.createTableIfNotExists('tasks', (table) => {
    table.increments('id').primary(); // Auto-increment primary key
    table.string('title').notNullable(); // not nullable 
    table.string('desc'); //
    table.boolean('isCompleted').defaultTo(false);
    table.string('createdAt'); // should it be .timestamp() ?
    table.string('updatedAt');
})
    .then(() => {
        console.log('Tasks table created or already exists');
    })
    .catch((err) => {
        console.error('Error creating table:', err);
    });