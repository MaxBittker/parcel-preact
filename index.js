import { h, render } from 'preact';
import List from './src/List';

if (process.env.NODE_ENV === 'development') {
	// Enable preact devtools
	// eslint-disable-next-line import/no-unassigned-import
	require('preact/devtools');
}

const mountNode = document.getElementById('root');

render(<List />, mountNode, mountNode.lastChild);

// Hot Module Replacement
if (module.hot) {
	module.hot.accept();
}
