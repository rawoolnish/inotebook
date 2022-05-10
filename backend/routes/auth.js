const express = require('express');
const router = express.Router();
require('../db')
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { json } = require('express');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const JWT_SECRET = 'Nishantisagoodboy';

//ROUTE:1.create a new user using : POST "/api/auth/createuser". dosent require login

router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('email','Enter a valid mail').isEmail(),
    body('password','Enter a valid passkey').isLength({ min: 5 }),
], async (req, res) => {
    //if there are errors ,return Bad requests and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check weather the user with this email exists already
    try {
        
   
    let user =await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt =await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt) 
        //create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });  
        const data = {
            user: {
                id:user.id
            }
        }
         
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.send({ authtoken })
     
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
    })

//ROUTE:2.authenticate user using :POST "api/auth/login".no log in required.
router.post('/login', [
    body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
//if errors occured return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user =await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials!" });
        }
        const passwordCompare =await  bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid Credentials!" });
        }
        const data = {
            user: {
        id:user.id
    }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured!")
    }
});

module.exports=router