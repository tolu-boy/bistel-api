const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../model/User')

/**
 *  route POST api/user/ register for registrationof user
 * access public
 */

router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        confirm_password
    } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "password dont match"
        })
    }
    // check for the unique user with findOne query(validation)

    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "username is already taken"
            })
        }
        return;

    });

    // check for the unique email with findOne query(validation)

    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "email is already taken"
            })
        }
        return;
    });

    // reg user 
    let newUser = new User({
        name,
        username,
        password,
        email
    });

    // hash password 
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: 'user has been registered'
                })
            });

        });

    });

});


module.exports = router;