import React from 'react';
import ReactDOM from 'react-dom';

function App() {
	return <p>Hello World</p>;
}

window.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(<App />, document.getElementById('app'));
});
