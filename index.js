import { h, render } from 'preact';
import App from './src/app';

if (process.env.NODE_ENV === 'development') {
	// Enable preact devtools
	// eslint-disable-next-line import/no-unassigned-import
	require('preact/devtools');
}

const mountNode = document.getElementById('root');

render(<App />, mountNode, mountNode.lastChild);

// Hot Module Replacement
if (module.hot) {
	module.hot.accept();
}
