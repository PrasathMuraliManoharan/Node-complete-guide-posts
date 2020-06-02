const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const feedsController = require('../controllers/feed')
const isAuth = require('../middleware/is-auth')

router.get('/posts', isAuth.isAuth, feedsController.getPosts)

router.post('/post', [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], feedsController.createPost)

router.get('/post/:postId', isAuth.isAuth, feedsController.getPost)

router.put('/post/:postId', isAuth.isAuth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], feedsController.updatePost)

router.delete('/post/:postId', isAuth.isAuth, feedsController.deletePost)

module.exports = router;