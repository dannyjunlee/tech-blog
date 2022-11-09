const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment, Post, User } = require('../../models');

// GET comments api
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }, { model: Post }]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// GET one comment
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User}, { model: Post }]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// POST create new post
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            text: req.body.text,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(commentData);
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// PUT update comment
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!commentData[0]) {
            res.status(404).json({ message: 'No comment found with that id.' });
            return;
        };

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// DELETE post
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id.' });
            return;
        };

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;