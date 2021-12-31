require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const controllers = require('./controllers');

const app = express();
const port = process.env.PORT || 8080;

const apiRouter = express.Router();
const jsonParser = bodyParser.json();

apiRouter.route('/posts').get(jsonParser, controllers.getPosts).post(jsonParser, controllers.createPost).put(jsonParser, controllers.likePost);

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

	app.listen(port, async() => {
		console.log(`API running on port ${port}`);
	});
}

connect();
