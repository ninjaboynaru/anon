require('dotenv').config();
const express = require('express');
const db = require('./db');
const controllers = require('./controllers');

const app = express();
const port = process.env.PORT || 8080;

const apiRouter = express.Router();
apiRouter.route('/posts').get(controllers.getPosts).post(controllers.createPost);
apiRouter.post('/posts/:postID', controllers.likePost);

app.use('/api', apiRouter);
app.get('/ping', (req, res) => {
	res.end('PONG');
});

async function connect() {
	try {
		await db.connect();
		console.log('Databse connected');
	}
	catch (dbErr) {
		throw new Error(`Failed to connect to DB\n------\n${dbErr}\n------`);
	}

	app.listen(port, () => {
		console.log(`API running on port ${port}`);
	});
}

connect();
