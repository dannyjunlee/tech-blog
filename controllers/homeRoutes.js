const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
        include: [{ model: User }, { model: Comment }]
    });

    const posts = postData.map((post) =>
        post.get({ plain: true })
    );

    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET one post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });

        const posts = postData.get({ plain: true });

        res.render('post', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Login route

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;