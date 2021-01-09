const express = require('express');
const router = express.Router();
const passport = require('passport');
const {createUser, isAdmin, checkUserExistance} = require('../services/user-service');
const { badRequestHandler } = require('../utils');
const { signupValidation } = require('../validations/signup-validations')

router.post('/login', 
passport.authenticate('local', {failureRedirect: '/login'}),
 (req, res) => {
    res.sendStatus(200);
});

router.post('/signup',signupValidation, async (req, res) => {
    try {
        const {data} = await createUser(req.body);
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(400);
        }
        req.logout();
        res.cookie('connect.sid', req.cookies['connect.sid'], {maxAge: -1});
        res.sendStatus(200);
    });
});

router.get('/isAdmin', async (req, res) => {
    try {
        const {id} = req.user;
        const [row] = await isAdmin(id)
        return  res.json(row[0])
    } catch(err) {
        return badRequestHandler(res);
    }
});

router.get('/doesUserExist/:userName', async (req, res)=> {
    try {
        const {userName} = req.params;
        const [row] = await checkUserExistance(userName);
        if (row.length > 0) {
            return res.json({userExists: true});
        }
        return res.json({userExists: false});
    } catch(err) {
        console.log(err);
        return badRequestHandler(res);
    }
});

module.exports = router;