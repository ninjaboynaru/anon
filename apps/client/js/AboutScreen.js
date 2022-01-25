import React from 'react';
import proptype from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNode, faReact } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import ScreenContainer from './ScreenContainer';

function AboutInfoBox({ icon, variation, title, children }) {
	const className = ['about-info-box'];
	className.push(`about-info-box-variation-${variation}`);

	return (
		<div className={className.join(' ')}>
			<FontAwesomeIcon icon={icon} className="about-info-box__icon" />
			<p className="about-info-box__title">{title}</p>
			<p className="about-info-box__body">{children}</p>
		</div>
	);
}

AboutInfoBox.propTypes = {
	icon: proptype.object.isRequired, // eslint-disable-line
	variation: proptype.string.isRequired,
	title: proptype.string.isRequired,
	children: proptype.node.isRequired
};

function AboutScreen() {
	return (
		<ScreenContainer>
			<div className="about-symbol-wheel">
				<img src="assets/symbol_wheel.png" alt="" />
			</div>
			<div className="about-info-boxes">
				<AboutInfoBox icon={faNode} title="Node JS" variation="1">
					Ghost was built using the power of JavaScript. Running Node.js on the backend, and React.js on the frontend
				</AboutInfoBox>
				<AboutInfoBox icon={faReact} title="React JS" variation="2">
					We used React.JS to create a modular, flexible, and performant frontend
				</AboutInfoBox>
				<AboutInfoBox icon={faCode} title="Profesional Code" variation="3">
				Ghost was built to professional rapid prototyping standards. Clean, modular, tested, and scalable code that meets the original product vision
				</AboutInfoBox>
			</div>
		</ScreenContainer>
	);
}

export default AboutScreen;
