import Component from 'inferno-component';
import { ItemCard } from './Item';

const listenerOptions = {
	capture: true,
};

const last = a => a[a.length - 1];

const initialState = { offset: 0, released: true, hint: false, active: false };

export default class SwipeRecognizer extends Component {
	constructor() {
		super();
		this.tolerance = Math.min(screen.width / 3, 200);
		this.gesture = { x: [], y: [], match: '' };
		this.state = initialState;
	}
	componentDidMount() {
		let node = this.body;

		node.addEventListener('touchstart', this.capture, listenerOptions);
		node.addEventListener('touchmove', this.capture, listenerOptions);
		node.addEventListener('touchend', this.compute, listenerOptions);
	}

	componentWillUnmount() {
		let node = this.body;
		node.removeEventListener('touchstart', this.capture, listenerOptions);
		node.removeEventListener('touchmove', this.capture, listenerOptions);
		node.removeEventListener('touchend', this.compute, listenerOptions);
	}

	capture = event => {
		this.gesture.x.push(event.touches[0].clientX);
		this.gesture.y.push(event.touches[0].clientY);
		let xStart = this.gesture.x[0];
		let xEnd = last(this.gesture.x);
		let xTravel = xEnd - xStart;
		if (Math.abs(xTravel) > 10) {
			event.preventDefault();
		}
		this.setState({
			offset: xTravel,
			released: false,
			active: true,
			hint: Math.abs(xTravel) > this.tolerance,
		});
	};

	compute = () => {
		let xStart = this.gesture.x[0];
		let yStart = this.gesture.y[0];
		let xEnd = last(this.gesture.x);
		let yEnd = last(this.gesture.y);
		let xTravel = xEnd - xStart;
		let yTravel = yEnd - yStart;

		if (
			Math.abs(yTravel) < this.tolerance &&
			Math.abs(xTravel) > this.tolerance
		) {
			console.log('dismissed', this.props.id);
			this.props.dismiss(this.props.id);
			window.setTimeout(() => this.setState(initialState), 2000);
		} else {
			this.setState({ offset: 0 });
		}

		this.gesture.x = [];
		this.gesture.y = [];
		this.setState({ released: true, active: false, hint: false });
	};

	render({ data, dismissed }, state) {
		return (
			<div ref={node => (this.body = node)}>
				<ItemCard {...data} dismissed={dismissed} {...state} />
			</div>
		);
	}
}
