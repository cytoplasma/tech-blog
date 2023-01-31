const router = require('express').Router();
const express = require('express');
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userid: req.session.userId,
        });
        res.json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occured when creating this comment.'
        });
    }
});

module.exports = router;