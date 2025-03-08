// jsonwebtoken => pkg for create and use JWT for auth and authorisation
const jwt = require('jsonwebtoken');

const User = require('./models/User');

// define an HTTP Post route
// .post listens for post at /login then runs async arrow func
app.post('/login', async (res, req) =>  {
    // req.body has POST data. destructure the JSON and extract to username, password
    const { username, password} = req.body;

    // query database to find user with same username
    // .findOne() is aync so await
    // returns user obj (document) is found otherwise null
    const user = await User.findOne({ username });

    // if no user doc found or password does not match

    if (!user || !(await bcrypt.compare(password, user.password))) {
        // return with response code 400 status code and message
        return res.status(400).json({ message: 'Invalid Credentials' });
    }
    
    // if user verified give user JWT token 
    // jwt.sign({PAYLOAD}, SECRET_KEY, {OPTIONS}) generates JWT token
    // PAYLOAD: payload of jwt. store info in the token. such as user unique id ._id
    // SECRET_KEY: secret key used to sign token
    // OPTIONS: e.g. set expire for token before reauth
    const token = jwt.sign({ userID: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});

    // res.json() sends JSON response back to client with generated JWT token
    // store in localstorage?
    // every time user sends a get or smthg it sends its token 
    res.json({token});

})