const db = require('./db');

class Post {
	constructor({ id, date, text = '', likes = 0, dislikes = 0 } = {}) {
		this.id = id || null;
		this.date = date || null;
		this.text = text;
		this.likes = likes;
		this.dislikes = dislikes;
	}

	async save() {
		const queryString = 'INSERT INTO post (text, likes, dislikes) VALUES ($1, $2, $3) RETURNING id, date';
		const values = [this.text, this.likes, this.dislikes];
		const { rows } = await db.query({ text: queryString, values });

		if (!rows[0]) {
			throw new Error('DB Did not insert Post');
		}

		this.id = rows[0].id;
		this.date = rows[0].date;
	}

	static async get(limit = 10, offset = 0) {
		const queryString = 'SELECT * FROM post ORDER BY date LIMIT $1 OFFSET $2';
		const values = [limit, offset];
		const { rows } = await db.query({ text: queryString, values });

		return rows.map((plainPost) => new Post(plainPost));
	}

	static async like(id) {
		const queryString = 'UPDATE post SET likes = likes + 1 WHERE id = $1';
		const values = [id];
		await db.query({ text: queryString, values });
	}

	static async dislike(id) {
		const queryString = 'UPDATE post SET dislikes = dislikes + 1 WHERE id = $1';
		const values = [id];
		await db.query({ text: queryString, values });
	}
}

module.exports = Post;
