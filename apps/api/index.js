const express = require('express');
const controllers = require('./controllers');

const app = express();
const port = process.env.PORT || 8080;

const apiRouter = express.Router();
apiRouter.route('/posts').get(controllers.getPosts).post(controllers.createPost);
apiRouter.post('/posts/:postID', controllers.likePost);

app.use(apiRouter, '/api');
app.get('/ping', (req, res) => {
	res.end('PONG');
});

app.listen(port, () => {
	console.log(`API running on port ${port}`);
});
