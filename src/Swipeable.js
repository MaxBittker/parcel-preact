import { Component, h, cloneElement } from 'preact';

export default class SwipeRecognizer extends Component {
	constructor() {
		super();
		this.tolerance = 200;
		this.gesture = { x: [], y: [], match: '' };
		this.dismissCalled = false;
		this.state = { offset: 0, swipe: false, released: true };
	}

	componentDidMount() {
		this.base.addEventListener('touchstart', this.capture, {
			capture: true,
			passive: true,
		});
		this.base.addEventListener('touchmove', this.capture, {
			capture: true,
			passive: true,
		});
		this.base.addEventListener('touchend', this.compute, {
			capture: true,
			passive: true,
		});
	}

	componentWillUnmount() {
		this.base.removeEventListener('touchstart', this.capture);
		this.base.removeEventListener('touchmove', this.capture);
		this.base.removeEventListener('touchend', this.compute);
	}

	capture = event => {
		this.gesture.x.push(event.touches[0].clientX);
		this.gesture.y.push(event.touches[0].clientY);

		let xStart = this.gesture.x[0];
		let xEnd = this.gesture.x.slice(-1)[0];
		let xTravel = xEnd - xStart;
		this.setState({ offset: xTravel, released: false });
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
			this.gesture.match = true;
			this.setState({ swipe: true });
			console.log('swiped');
			window.setTimeout(() => {
				if (this.dismissCalled) {
					return;
				} else {
					this.props.dismiss();
					this.dismissCalled = true;
				}
			}, 500);
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
