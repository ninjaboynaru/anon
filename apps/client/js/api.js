const api = new function() {
	const apiPath = '/api/posts';

	this.getPosts = function getPosts(page = 0) {
		const url = `${apiPath}/?limit102&page=${page}`;

		return fetch(url).then(
			(response) => {
				if (!response.ok) {
					throw new Error('API Response was not OK');
				}

				return response.json();
			}
		);
	};

	this.likePost = function likePost(postID) {
		const fetchOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: postID,
				like: true
			})
		};

		fetch(apiPath, fetchOptions);
	};

	this.dislikePost = function dislikePost(postID) {
		const fetchOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: postID,
				like: false
			})
		};

		fetch(apiPath, fetchOptions);
	};

	this.createPost = function createPost(text) {
		const fetchOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text })
		};

		return fetch(apiPath, fetchOptions).then(
			(response) => {
				if (!response.ok) {
					throw new Error('API Response was not OK');
				}
			}
		);
	};
}();

export default api;
