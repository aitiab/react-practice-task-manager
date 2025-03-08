// Knex is a SQL query builder. build SQL queries in programmatic way

const knex = require('knex'); // Import/load knex.js library

// knex() creates a Knex Instance. You pass {} a config obj to create knex instance.
const knexInstance = knex ({
    client: 'sqlite3', // Specifies the database client to use
    connection: { // specify how to connect to SQLite DB
        filename: './database.db', // Path to database file
    },
    useNullAsDefault: true, // A config needed for SQLite3 due to way it handles null values
});

module.exports = knexInstance; // export so other files can use knexInstance when they do require('/models/knex.js')