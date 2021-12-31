const Post = require('../db/post');
const { internalError, clientError } = require('./util');

module.exports = async function likePost(req, res) {
	const id = req.body.id;
	let like = req.body.like;

	if (typeof like !== 'boolean') {
		like = true;
	}

	if (typeof id !== 'number') {
		return clientError(res, 'Invalid "id" property');
	}

	let dbFunction;

	if (like === true) {
		dbFunction = Post.like;
	}
	else {
		dbFunction = Post.dislike;
	}

	try {
		await dbFunction(id);
	}
	catch (err) {
		internalError(res);
		console.error('Error in API likePost\n------', err);
		return;
	}

	res.status(200).send();
};
