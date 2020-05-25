const { validationResult } = require('express-validator')
exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: 'test-1',
                title: 'First Post',
                content: 'This is the first post',
                imageUrl: '',
                creator: { name: 'Prasath' },
                createdAt: new Date()
            },

        ]
    })
}

exports.createPost = (req, res, next) => {
    //create a post
    const title = req.body.title;
    const content = req.body.content;
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(422).json({ message: 'Validation failed', errors: errors.array() })
    }
    res.status(201).json({
        message: 'Post created successfully',
        post: {
            id: new Date().toISOString(), title, content,
            creator: { name: 'Prasath' },
            createdAt: new Date()
        }
    })
}