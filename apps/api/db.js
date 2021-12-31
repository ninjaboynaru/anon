const pg = require('pg');

const client = new pg.Client({ ssl: { rejectUnauthorized: false } });

async function connect() {
	return client.connect();
}

async function query(queryValue) {
	return client.query(queryValue);
}

module.exports = { connect, query };
