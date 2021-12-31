const Post = require('../db/post');
const { internalError } = require('./util');

module.exports = async function getPosts(req, res) {
	let { limit = 10, page = 0 } = req.body;

	if (limit <= 0 || limit >= 25 || typeof limit !== 'number') {
		limit = 10;
	}

	if (page < 0 || typeof page !== 'number') {
		page = 0;
	}

	let posts;

	try {
		posts = await Post.get(limit, page);
	}
	catch (err) {
		internalError(res);
		console.error('Error in API getPosts\n------', err);
		return;
	}

	res.status(200).send(posts);
};
