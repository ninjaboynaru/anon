import React from 'react';
import propTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

function ScreenContainer({ children }) {
	const navigate = useNavigate();
	const location = useLocation();

	const navPostsScreen = () => navigate('/');
	const navAboutScreen = () => navigate('/about');

	const postsButtonSubdued = location.pathname !== '/';
	const aboutButtonSubdued = location.pathname !== '/about';

	return (
		<div className="screen-container">
			<div className="screen-container__nav">
				<div className="screen-container__nav__brand">
					<FontAwesomeIcon icon={faGhost} className="screen-container__nav__brand-icon" />
					<span className="screen-container__nav__brand-text">Anon</span>
				</div>
				<div className="screen-container__nav__buttons">
					<Button wide secondary subdued={postsButtonSubdued} onClick={navPostsScreen}>Posts</Button>
					<Button wide secondary subdued={aboutButtonSubdued} onClick={navAboutScreen}>About</Button>
				</div>
			</div>
			<div className="screen-container__content">
				{children}
			</div>
		</div>
	);
}

ScreenContainer.propTypes = {
	children: propTypes.node
};

ScreenContainer.defaultProps = {
	children: null
};

export default ScreenContainer;
