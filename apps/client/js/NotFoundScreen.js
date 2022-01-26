import React from 'react';
import ScreenContainer from './ScreenContainer';

function NotFoundScreen() {
	const headerText = "Whatever you were looking for, dosen't exist";
	return (
		<ScreenContainer>
			<img src="assets/surprised_cat.png" alt="" className="not-found-img" />
			<h1 className="not-found-header">{headerText}</h1>
		</ScreenContainer>
	);
}

export default NotFoundScreen;
