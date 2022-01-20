const Post = require('../db/post');
const { internalError } = require('./util');

function isNumber(val) {
	// eslint-disable-next-line no-restricted-globals
	return !isNaN(val);
}

const defaults = {
	limit: 10,
	page: 0
};

const ranges = {
	limit: {
		min: 1,
		max: 25
	},
	page: {
		min: 0
	}
};

module.exports = async function getPosts(req, res) {
	let { limit = defaults.limit, page = defaults.page } = req.query;

	if (isNumber(limit) === false) {
		limit = defaults.limit;
	}
	if (isNumber(page) === false) {
		page = defaults.page;
	}

	limit = parseInt(limit, 10);
	page = parseInt(page, 10);

	if (limit < ranges.limit.min || limit > ranges.limit.max) {
		limit = defaults.limit;
	}

	if (page < ranges.page.min) {
		page = defaults.page;
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
