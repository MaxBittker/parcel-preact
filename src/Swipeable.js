import { Component, h, cloneElement } from 'preact';
import { list } from 'postcss';

const listenerOptions = {
	capture: true,
	passive: true,
};

export default class SwipeRecognizer extends Component {
	constructor() {
		super();
		this.tolerance = 200;
		this.gesture = { x: [], y: [], match: '' };
		this.state = { offset: 0, released: true, hint: false };
	}

	componentDidMount() {
		this.base.addEventListener('touchstart', this.capture, listenerOptions);
		this.base.addEventListener('touchmove', this.capture, listenerOptions);
		this.base.addEventListener('touchend', this.compute, listenerOptions);
	}

	componentWillUnmount() {
		console.log('unmounting', this.props.id);
		this.base.removeEventListener('touchstart', this.capture, listenerOptions);
		this.base.removeEventListener('touchmove', this.capture, listenerOptions);
		this.base.removeEventListener('touchend', this.compute, listenerOptions);
	}

	capture = event => {
		this.gesture.x.push(event.touches[0].clientX);
		this.gesture.y.push(event.touches[0].clientY);

		let xStart = this.gesture.x[0];
		let xEnd = this.gesture.x.slice(-1)[0];
		let xTravel = xEnd - xStart;
		this.setState({
			offset: xTravel,
			released: false,
			hint: Math.abs(xTravel) > this.tolerance,
		});
	};

	compute = event => {
		let xStart = this.gesture.x[0];
		let yStart = this.gesture.y[0];
		let xEnd = this.gesture.x.pop();
		let yEnd = this.gesture.y.pop();
		let xTravel = xEnd - xStart;
		let yTravel = yEnd - yStart;

		if (
			Math.abs(yTravel) < this.tolerance &&
			Math.abs(xTravel) > this.tolerance
		) {
			console.log('swiped', this.props.id);
			this.props.dismiss(this.props.id);
		} else {
			this.setState({ offset: 0 });
		}

		this.gesture.x = [];
		this.gesture.y = [];
		this.setState({ released: true });
	};

	render({ children }, state) {
		return cloneElement(children[0], state);
	}
}
