const express = require('express');

const debugRouter = express.Router();

debugRouter.get('/ping', (req, res) => {
	res.end('PONG');
});

module.exports = debugRouter;
