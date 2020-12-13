const router = require('express').Router();
const User = require('../models/User');
const {registerValidation} = require('../validation/register');
const {loginValidation} = require('../validation/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/register', async (req, res) => {
    // Validate the data
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send({
        status: 400,
        message: error.details[0].message 
    });

    // Checking if the user is already in the database
    const userExists = await User.findOne({email : req.body.email});
    if (userExists) return res.status(400).send({
        status: 400,
        message: 'Email already exists'
    });

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
        
    try {
        const savedUser = await user.save();

        res.status(200).send({
            status: 200,
            mesage: "User successfully saved",
            data: savedUser
        });
    } catch(err) {
        res.status(500).send(err);
    }
});

router.post('/login', async (req,res) => {
    // Validate the data
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send({
        status: 400,
        message: error.details[0].message 
    });

    const user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send({
        status: 400,
        message: 'Email or Password is wrong'
    });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({
        status: 400,
        message: 'Email or Password is wrong'
    });

    const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_SECRET);

    const userResponse = {
        name: user.name,
        email: user.password,
        token: token
    }

    res.status(200).send({
        status: 200,
        mesage: "Logged In",
        data: userResponse
    });
});

module.exports = router;