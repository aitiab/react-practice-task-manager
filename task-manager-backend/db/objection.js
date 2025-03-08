// objectionjs is a Object-relational mapper (ORM) built on knex.js
// objectionjs allows interact with db using javascript objects (ORM) + capability for raw sql

/* 
    import model class from objection.js
    model class is base class that all my models will extend
    model =represents= a db table 
*/
const { Model } = require('objection');


/*
    import kenxInstance
    contains all neccessary db configs (like db client and connection)
*/
const knexInstance = require('./knex')


// objection use the knexinstance for internal db interact (i.e. create and execute sql queries)
Model.knex(knexInstance);


module.exports = { Model };