import { Component, h, cloneElement } from 'preact';

// var before, now, fps;
// before = Date.now();
// fps = 0;

export default class Header extends Component {
	// componentDidMount() {
	// 	requestAnimationFrame(this.loop);
	// }

	// loop = () => {
	// 	now = Date.now();
	// 	fps = 10 * Math.floor(100 / (now - before));
	// 	before = now;
	// 	requestAnimationFrame(this.loop);
	// 	this.forceUpdate();
	// };

	render({ items, fetching }) {
		return (
			<div className="header">
				{fetching && <span>fetching</span>}

				<span>Items: {items.length} </span>
			</div>
		);
	}
}
