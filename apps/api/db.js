const pg = require('pg');

const client = new pg.Client({ ssl: { rejectUnauthorized: false } });

async function connect() {
	return client.connect();
}

module.exports = { connect };
