const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment, Post, User } = require('../../models');

// GET posts api
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// GET one post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User}, { model: Comment }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// POST create new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(postData);
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// PUT update post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!postData[0]) {
            res.status(404).json({ message: 'No post found with that id.' });
            return;
        };

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// DELETE post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id.' });
            return;
        };

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;