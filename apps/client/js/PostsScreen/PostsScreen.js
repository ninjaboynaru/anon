import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import LoadingIcons from 'react-loading-icons';
import ScreenContainer from '../ScreenContainer';
import Post from './Post';
import api from '../api';

function LoadingIndicator() {
	return <LoadingIcons.BallTriangle stroke="#724ed0" />;
}

function ErrorMessage({ children }) {
	return <p className="error-message"><FontAwesomeIcon icon={faCat} />{`  ${children}`}</p>;
}

ErrorMessage.propTypes = {
	children: propTypes.string.isRequired
};

class PostsScreen extends React.Component {
	constructor() {
		super();
		this.page = 0;
		this.state = { posts: null, initialLoading: true, initialError: false, addonLoading: false, addonError: false, noMorePosts: false };

		this.onWindowScroll = this.onWindowScroll.bind(this);
		this.likePost = this.likePost.bind(this);
		this.dislikePost = this.dislikePost.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onWindowScroll);
		this.loadInitialPosts();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onWindowScroll);
	}

	onWindowScroll() {
		const { initialLoading, initialError, addonLoading, addonError, noMorePosts } = this.state;
		const loading = initialLoading || addonLoading;
		const error = initialError || addonError;
		const atBottomOfScreen = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2;

		if (atBottomOfScreen && !loading && !error && !noMorePosts) {
			this.loadAddonPosts();
		}
	}

	loadInitialPosts() {
		api.getPosts(this.page).then(
			(posts) => {
				this.setState({ initialLoading: false, posts });
			},
			() => {
				this.setState({ initialLoading: false, initialError: true });
			}
		);
	}

	loadAddonPosts() {
		this.setState({ addonLoading: true });

		api.getPosts(this.page + 1).then(
			(posts) => {
				if (posts.length !== 0) {
					this.page += 1;
					this.setState((prevState) => ({ posts: [...prevState.posts, ...posts] }));
				}
				else {
					this.setState({ noMorePosts: true });
				}

				this.setState({ addonLoading: false });
			},
			() => {
				this.setState({ addonLoading: false, addonError: true });
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
		const { posts, addonLoading, addonError, noMorePosts } = this.state;

		const postsList = posts.map((post) => <Post key={post.id} post={post} likePost={this.likePost} dislikePost={this.dislikePost} />);
		let loadingIndicator;
		let errorMessage;
		let noMorePostsMessage;

		if (addonLoading) {
			loadingIndicator = <LoadingIndicator />;
		}
		else if (addonError) {
			errorMessage = <ErrorMessage>Whoa! Something unexpected happend on our end. Please try agian later</ErrorMessage>;
		}
		else if (noMorePosts) {
			noMorePostsMessage = <ErrorMessage>Nothing left to show at this time</ErrorMessage>;
		}

		return (
			<div className="posts-container">
				{postsList}
				{loadingIndicator}
				{errorMessage}
				{noMorePostsMessage}
			</div>
		);
	}

	render() {
		const { initialLoading, initialError } = this.state;
		let content;

		if (initialError === true) {
			content = <ErrorMessage>Oops, looks like something went wrong on our end. Try agian later</ErrorMessage>;
		}
		else if (initialLoading === true) {
			content = <LoadingIndicator />;
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
