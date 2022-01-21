import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from '../Button';

dayjs.extend(relativeTime);

function Post({ post, likePost, dislikePost, liked, disliked }) {
	const parsedDate = dayjs(post.date);
	let dateText;

	if (parsedDate.isValid() === false) {
		dateText = 'Unknown Date';
	}
	else {
		dateText = parsedDate.fromNow();
	}

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
		text: propTypes.string,
		date: propTypes.string,
		likes: propTypes.number,
		dislikes: propTypes.number
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
