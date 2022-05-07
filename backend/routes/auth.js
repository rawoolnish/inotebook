const express = require('express');
const router = express.Router();
require('../db')
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { json } = require('express');

//create a new user using : POST "/api/auth/createuser". dosent require login

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
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });  
    res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
    })


module.exports=router