import React from 'react';
import propTypes from 'prop-types';

function Button({ children, onClick, secondary, subdued }) {
	const className = ['btn'];
	if (secondary === true) {
		className.push('secondary');
	}
	if (subdued === true) {
		className.push('subdued');
	}

	return <button type="button" onClick={onClick} className={className.join(' ')}>{children}</button>;
}

Button.propTypes = {
	children: propTypes.node,
	onClick: propTypes.func.isRequired,
	secondary: propTypes.bool,
	subdued: propTypes.bool
};

Button.defaultProps = {
	children: null,
	secondary: false,
	subdued: false
};

export default Button;
