import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostsScreen from './PostsScreen/PostsScreen';
import CreatePostScrene from './CreatePostScrene';
import AboutScreen from './AboutScreen';
import NotFoundScreen from './NotFoundScreen';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PostsScreen />} />
				<Route path="/create" element={<CreatePostScrene />} />
				<Route path="/about" element={<AboutScreen />} />
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>
		</BrowserRouter>
	);
}

window.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(<App />, document.getElementById('app'));
});
