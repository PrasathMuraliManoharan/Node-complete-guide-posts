const { validationResult } = require('express-validator')
const Post = require('../models/post');
exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    Post.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Post.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        })
        .then(posts => {
            if (!posts) {
                const error = new Error('No Posts found');
                error.statusCode = 422;
                throw error;
            }
            res.status(200).json({ message: 'Posts fetched', posts: posts, totalItems, })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.createPost = (req, res, next) => {
    //create a post
    console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        throw error;
        // return res.status(422).json({ message: ', errors: errors.array() })
    }
    // if (!req.file) {
    //     const error = new Error('Invalid file uploaded');
    //     error.statusCode = 422;
    //     throw error;
    // }
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = '';// req.body.file.path;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: { name: 'Prasath' },
    })
    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully',
                post: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('No product with postid is found');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({ message: 'Post fetched', post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updatePost = (req, res, next) => {
    const postId = req.params.postId
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        throw error;
        // return res.status(422).json({ message: ', errors: errors.array() })
    }

    const title = req.body.title;
    const content = req.body.content;

    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('No product with postid is found');
                error.statusCode = 404;
                throw error;
            }
            post.title = title;
            post.content = content;
            return post.save()
        })
        .then(res => {
            res.status(200).json({ message: 'Post updated', post: res })
        })
};

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('No product with postid is found');
                error.statusCode = 404;
                throw error;
            }
            return Post.findByIdAndRemove(postId)
        })
        .then(res => {
            res.status(200).json({ message: 'Post deleted', post: res })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}