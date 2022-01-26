import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faPen } from '@fortawesome/free-solid-svg-icons';
import LoadingIcons from 'react-loading-icons';
import withNavigate from '../withNavigate';
import ScreenContainer from '../ScreenContainer';
import Button from '../Button';
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
		this.state = { posts: null, likedPosts: [], dislikedPosts: [], initialLoading: true, initialError: false, addonLoading: false, addonError: false, noMorePosts: false };

		this.checkWindowScroll = this.checkWindowScroll.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.checkWindowScroll);
		this.loadInitialPosts();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.checkWindowScroll);
	}

	checkWindowScroll() {
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
				this.checkWindowScroll();
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

	buildPostWall() {
		const { posts, likedPosts, dislikedPosts, addonLoading, addonError, noMorePosts } = this.state;

		const postsList = posts.map((post) => {
			const postLiked = likedPosts.includes(post.id);
			const postDisliked = dislikedPosts.includes(post.id);
			const postAlreadyActedOn = postLiked || postDisliked;

			const onLikeClick = () => {
				if (postAlreadyActedOn) {
					return;
				}

				this.setState((prevState) => ({ likedPosts: [...prevState.likedPosts, post.id] }));

				api.likePost(post.id);
			};

			const onDislikeClick = () => {
				if (postAlreadyActedOn) {
					return;
				}

				this.setState((prevState) => ({ dislikedPosts: [...prevState.dislikedPosts, post.id] }));

				api.dislikePost(post.id);
			};

			return <Post key={post.id} post={post} likePost={onLikeClick} dislikePost={onDislikeClick} liked={postLiked} disliked={postDisliked} />;
		});
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

		const onCreatePostClick = () => this.props.navigate('/create');
		return (
			<div className="posts-container">
				<Button primary onClick={onCreatePostClick}><FontAwesomeIcon icon={faPen} />{'  Post Anonymously'}</Button>
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

PostsScreen.propTypes = {
	navigate: propTypes.func.isRequired
};

export default withNavigate(PostsScreen);
