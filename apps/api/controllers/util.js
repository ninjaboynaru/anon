function internalError(res) {
	res.status(500).send({ error: 'An internal server error has occurred' });
}

function clientError(res, message) {
	res.status(400).send({ error: message });
}

module.exports = { internalError, clientError };
