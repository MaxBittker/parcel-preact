import { render } from 'inferno';

import List from './src/List';
import styles from './src/styles.css';

const mountNode = document.getElementById('root');

render(<List />, mountNode, mountNode.lastChild);

// Hot Module Replacement
if (module.hot) {
	module.hot.accept();
}
