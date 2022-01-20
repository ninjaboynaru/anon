require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const apiRouter = express.Router();
const jsonParser = bodyParser.json();
apiRouter.get('/api/posts/:limit?:page?', controllers.getPosts);
apiRouter.route('/api/posts/').post(jsonParser, controllers.createPost).put(jsonParser, controllers.likePost);

module.exports = apiRouter;
