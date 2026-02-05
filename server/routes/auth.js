const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const JWT_SECRET='messiIsTheGOAT@2024';

//ROUTE 1:create a user using: POST "/api/auth/createuser". No login required

router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
], async (req, res) => 
    {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
    //checking if user with this email already exists
    let user= await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({
            error:"sorry a user with this email already exists"

        })
    }
    const salt=await bcrypt.genSalt(10);
    const secpass=await bcrypt.hash(req.body.password,salt);

   user= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secpass,
    })
    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    res.json({authToken});
    


    // res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2 :authticate a user using: POST "/api/auth/login". No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should not be empty').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                error: "Please enter valid credentials"
            });
        }

        const compairePassword = await bcrypt.compare(password, user.password);
        if (!compairePassword) {
            return res.status(400).json({
                error: "Please enter valid credentials"
            });
        }
        
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;