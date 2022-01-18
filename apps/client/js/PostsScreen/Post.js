import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

function Post({ post, likePost, dislikePost }) {
	return (
		<div className="post">
			<span className="post__date">{post.date}</span>
			<span className="post__text">{post.text}</span>
			<div className="post__control-bar">
				<Button primary outline onClick={likePost}><FontAwesomeIcon className="posts__control-bar__icon" icon={faThumbsUp} />{post.likes}</Button>
				<Button primary outline onClick={dislikePost}><FontAwesomeIcon className="posts__control-bar__icon" icon={faThumbsDown} />{post.dislikes}</Button>
			</div>
		</div>
	);
}

Post.propTypes = {
	post: propTypes.shape({
		text: propTypes.string,
		date: propTypes.string,
		likes: propTypes.number,
		dislikes: propTypes.number
	}).isRequired,
	likePost: propTypes.func.isRequired,
	dislikePost: propTypes.func.isRequired
};

export default Post;
