require('dotenv').config();
const express = require('express');
const db = require('./db/db');
const debugRouter = require('./routers/debugRouter');
const staticRouter = require('./routers/staticRouter');
const apiRouter = require('./routers/apiRouter');

const app = express();
const port = process.env.PORT || 8080;

app.use(debugRouter);
app.use(apiRouter);
app.use(staticRouter);

async function connect() {
	try {
		await db.connect();
		console.log('Databse connected');
	}
	catch (dbErr) {
		throw new Error(`Failed to connect to DB\n------\n${dbErr}\n------`);
	}

	const server = app.listen(port, async() => {
		console.log(`API running on port ${port}`);
	});

	process.on('exit', () => {
		server.close();
	});
}

connect();
