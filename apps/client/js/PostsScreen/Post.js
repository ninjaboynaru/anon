import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import relativeDate from 'tiny-relative-date';
import Button from '../Button';

function Post({ post, likePost, dislikePost, liked, disliked }) {
	const dateText = relativeDate(post.date);
	let totalLikes = post.likes;
	let totalDislikes = post.dislikes;

	if (liked) {
		totalLikes += 1;
	}
	else if (disliked) {
		totalDislikes += 1;
	}

	return (
		<div className="post">
			<span className="post__date">{dateText}</span>
			<span className="post__text">{post.text}</span>
			<div className="post__control-bar">
				<Button primary outline={!liked} onClick={likePost}><FontAwesomeIcon className="posts__control-bar__icon" icon={faThumbsUp} />{totalLikes}</Button>
				<Button primary outline={!disliked} onClick={dislikePost}><FontAwesomeIcon className="posts__control-bar__icon" icon={faThumbsDown} />{totalDislikes}</Button>
			</div>
		</div>
	);
}

Post.propTypes = {
	post: propTypes.shape({
		text: propTypes.string.isRequired,
		date: propTypes.string.isRequired,
		likes: propTypes.number.isRequired,
		dislikes: propTypes.number.isRequired
	}).isRequired,
	likePost: propTypes.func.isRequired,
	dislikePost: propTypes.func.isRequired,
	liked: propTypes.bool,
	disliked: propTypes.bool
};

Post.defaultProps = {
	liked: false,
	disliked: false
};

export default Post;
