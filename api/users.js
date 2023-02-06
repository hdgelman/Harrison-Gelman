const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../db/users')
const { requireUser } = require('./utils');

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: 'Missing Credentials Error',
            message: 'You must enter a username and password. Stop playing with me.'
        });
    }

    try {
        const user = await getUserByUsername(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            delete user.password;

            res.send({
                message: 'You are logged in!',
                token,
                user
            })
        } else {
            next({
                name: 'Incorrect Credentials Error',
                message: 'Login failed, make sure your username and password are spelled correctly!'
            })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            res.send({
                error: 'UserExistsError',
                message: `User ${_user.username} is taken lmao.`,
                name: 'error'
            });
            return;
        }

        if (password.length < 8) {
            res.send({
                error: 'PasswordTooShort',
                message: 'That password is way too small my guy.',
                name: 'error'
            })
            return;
        }

        const user = await createUser({
            username,
            password
        });

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        delete user.password;

        res.send({
            message: 'Thank you for signing up!',
            token,
            user
        });

    } catch ({ name, message }) {
        next({ name, message });
    }
});

usersRouter.get('/me', requireUser, async (req, res) => {
    try {
        res.send(req.user);

    } catch (error) {
        throw error;
    }
});

module.exports = usersRouter;