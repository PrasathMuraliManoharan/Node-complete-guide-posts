const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());

//fix for CROS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Access-Origin', '*');
    res.setHeader('Access-Control-Access-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Access-Headers', 'Content-Type, Authorization')
})

app.use('/feed', feedRoutes)

app.listen(8080);
