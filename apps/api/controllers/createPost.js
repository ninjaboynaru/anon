const Post = require('../db/post');
const { internalError, clientError } = require('./util');

module.exports = async function createPost(req, res) {
	const { text } = req.body;

	if (typeof text !== 'string' || text.trim().length > 250) {
		return clientError(res, 'Invalid "text" property');
	}

	try {
		await new Post({ text }).save();
	}
	catch (err) {
		internalError(res);
		console.error('Error in API createPost\n------', err);
		return;
	}

	res.status(200).send();
};
