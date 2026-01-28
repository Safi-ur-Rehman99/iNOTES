const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post('/', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
    res.json({error:'Please enter a unique value for email',message:err.message})});
});

module.exports = router;