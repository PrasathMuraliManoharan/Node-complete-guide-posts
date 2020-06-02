const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    if(!token){
        const error = new Error('Not Authorized')
        error.statusCode = 401;
        throw error;
    }
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret')
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not Authorized')
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}