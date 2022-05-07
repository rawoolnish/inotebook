const express = require('express');
const router = express.Router();
require('../db')
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//create a new user dosent require auth

router.post('/', [
    body('name','Enter a valid name').isLength({ min: 5 }),
    body('email','Enter a valid mail').isEmail(),
    body('password','Enter a valid passkey').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
        .catch(err => {
            console.log(err)
            res.json({ error: 'please enter a unique user' ,message:err.message})
        })
    
    })


module.exports=router