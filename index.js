import { render } from 'inferno';

import List from './src/List';

if (process.env.NODE_ENV === 'development') {
	// Enable inferno devtools
	// eslint-disable-next-line import/no-unassigned-import
	// require('inferno/devtools');
}

const mountNode = document.getElementById('root');

render(<List />, mountNode, mountNode.lastChild);

// Hot Module Replacement
if (module.hot) {
	module.hot.accept();
}
