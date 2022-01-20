import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import LoadingIcons from 'react-loading-icons';
import ScreenContainer from '../ScreenContainer';
import Post from './Post';
import api from '../api';

class PostsScreen extends React.Component {
	constructor() {
		super();
		this.page = 0;
		this.state = { posts: null, loading: true, error: false };
		this.onPostsScroll = this.onPostsScroll.bind(this);
		this.likePost = this.likePost.bind(this);
		this.dislikePost = this.dislikePost.bind(this);
	}

	componentDidMount() {
		api.getPosts(this.page).then(
			(posts) => {
				this.setState({ loading: false, posts });
			},
			(e) => {
				console.error(e);
				this.setState({ loading: false, error: true });
			}
		);
	}

	onPostsScroll() {
		console.log('SCROLL', this);
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
			<div className="posts-container" onScroll={this.onPostsScroll}>
				{posts}
			</div>
		);
	}

	render() {
		const { loading, error } = this.state;
		let content;

		if (error === true) {
			content = <p className="error-message"><FontAwesomeIcon icon={faCat} />  Oops, looks like something went wrong on our end. Try agian later</p>;
		}
		else if (loading === true) {
			content = <LoadingIcons.BallTriangle stroke="#724ed0" />;
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
