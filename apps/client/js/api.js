const api = new function() {
	const apiPath = '/api/posts';
	this.getPosts = function getPosts(page = 0) {
		const url = `${apiPath}/?${page}`;
		const fetchOptions = {
			headers: { 'Content-Type': 'application/json' }
		};

		return fetch(url, fetchOptions).then(
			(response) => {
				if (response.ok === false) {
					throw new Error('API Response was not OK');
				}

				return response.json();
			}
		);
	};
}();

export default api;
