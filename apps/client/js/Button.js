import React from 'react';
import propTypes from 'prop-types';

function Button({ children, onClick, primary, secondary, subdued, outline }) {
	const className = ['btn'];
	if (primary === true) {
		className.push('primary');
	}
	if (secondary === true) {
		className.push('secondary');
	}
	if (subdued === true) {
		className.push('subdued');
	}
	if (outline === true) {
		className.push('outline');
	}

	return <button type="button" onClick={onClick} className={className.join(' ')}>{children}</button>;
}

Button.propTypes = {
	children: propTypes.node,
	onClick: propTypes.func.isRequired,
	primary: propTypes.bool,
	secondary: propTypes.bool,
	subdued: propTypes.bool,
	outline: propTypes.bool
};

Button.defaultProps = {
	children: null,
	primary: false,
	secondary: false,
	subdued: false,
	outline: false
};

export default Button;
