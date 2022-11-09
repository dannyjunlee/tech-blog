const router = require('express').Router();
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');
const { Comment, Post, User } = require('../../models');

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(404).json({ message: 'Login failed. Please try again.' });
            return;
        };

        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        if (!validPassword) {
            res.status(400).json({ messasge: 'Login failed. Please try again!' });
            return;
        };

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;