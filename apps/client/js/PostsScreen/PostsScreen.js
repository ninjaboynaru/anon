import React from 'react';
import ScreenContainer from '../ScreenContainer';
import Post from './Post';
import api from '../api';

class PostsScreen extends React.Component {
	constructor() {
		super();
		this.state = { posts: null, loading: true, error: false };
		this.likePost = this.likePost.bind(this);
		this.dislikePost = this.dislikePost.bind(this);
	}

	componentDidMount() {
		api.getPosts().then(
			(posts) => {
				this.setState({ loading: false, posts });
			},
			() => {
				this.setState({ loading: false, error: true });
			}
		);
	}

	likePost() {
		console.log(this);
	}

	dislikePost() {
		console.log(this);
	}

	buildPostWall() {
		const posts = this.state.posts.map((post) => <Post key={post.id} post={post} likePost={this.likePost} dislikePost={this.dislikePost} />);

		return (
			<div className="posts-container">
				{posts}
			</div>
		);
	}

	render() {
		const { loading, error } = this.state;
		let content;

		if (error === true) {
			content = <p>An error has occured</p>;
		}
		else if (loading === true) {
			content = <p>Loading...</p>;
		}
		else {
			content = this.buildPostWall();
		}

		return (
			<ScreenContainer>
				{content}
			</ScreenContainer>
		);
	}
}

export default PostsScreen;
