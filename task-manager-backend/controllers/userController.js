// jsonwebtoken => pkg for create and use JWT for auth and authorisation
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const User = require('../db/models/User');

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (await User.query().where('username', username).first()) {
            return res.status(400).json({message: 'User already exists'});
        }

        const newUser = await User.query().insert({username, password});
        return res.status(201).json({message: 'User successfully created'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


// auth
exports.login = async (req, res) => {
    // req.body has POST data. destructure the JSON and extract to username, password
    const { username, password} = req.body;

    try{

        // query database to find user with same username
        // .query() returns QueryBuilder instance which has knex queryBuilder methods
        // returns QueryBuilder instance is found otherwise empty array hence user[0] would be undefined???
        const user = await User.query().where('username', username).first();    

        if (!user || !(await bcrypt.compare(password, user.password))) {
            // return with response code 400 status code and message
            console.log('issue')
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // if user verified give user JWT token 
        // jwt.sign({PAYLOAD}, SECRET_KEY, {OPTIONS}) generates JWT token
        // PAYLOAD: payload of jwt. store info in the token. such as user unique id ._id
        // SECRET_KEY: secret key used to sign token
        // OPTIONS: e.g. set expire for token before reauth
        const token = jwt.sign({ userID: user.id}, process.env.JWT_SECRET, { expiresIn: '1h'});
    
        // res.json() sends JSON response back to client with generated JWT token
        // store in localstorage?
        // every time user sends a get or smthg it sends its token 
        res.json({token});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


