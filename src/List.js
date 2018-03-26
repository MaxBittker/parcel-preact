import Component from 'inferno-component';

import { get } from 'axios';
import { BASE_URL } from './fetching';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import Item from './Item';
import Loading from './Loading';
import Header from './Header';
import styles from './styles.css';

export default class List extends Component {
	state = { scrollLocation: 0, items: [], dismissedIDs: new Set() };

	componentDidMount() {
		document.addEventListener('scroll', this.onScroll);
		this.fetchItems();
	}
	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll);
	}

	onScroll = e => {
		let { scrollHeight } = window.document.body;
		let { scrollY, innerHeight } = window;

		// if we're within 5 screen of the bottom, fetch more data
		if (scrollY > scrollHeight - innerHeight * 5) {
			this.fetchItems();
		}

		// this is a number between 0 and 1 representing our scroll location.
		// it's used to decide which components to enable touch events on
		this.updateLocation((scrollY + innerHeight / 2) / scrollHeight);
	};

	//this triggers renders, so don't let it fire on every scroll event
	updateLocation = throttle(scrollLocation => {
		this.setState({ scrollLocation });
	}, 250);

	fetchItems() {
		let { lastPageToken, fetching } = this.state;

		if (fetching) return;

		this.setState({ fetching: true });

		get(`${BASE_URL}/messages`, {
			params: {
				limit: 50,
				pageToken: lastPageToken,
			},
		})
			.then(this.onFetchSuccess)
			.catch(error => {
				this.setState({ fetching: false });
				console.error(error);
			});
	}

	onFetchSuccess = ({ data }) => {
		let { items } = this.state;
		let { count, messages, pageToken } = data;
		let { scrollY } = window;
		this.setState({
			items: [...items, ...messages],
			fetching: false,
			lastPageToken: pageToken,
		});
	};
	//callback for tracking dismissed ids
	dismissID(id) {
		this.setState(
			({ dismissedIDs }) => ({
				dismissedIDs: dismissedIDs.add(id),
			}),
			// see if we need to refetch
			this.onScroll
		);
	}
	render({}, { scrollLocation, items, fetching, dismissedIDs }) {
		// aproximate number of interactive items to render at a given time
		let liveZone = 16 / 2;

		let visibleCount = 0;

		//annotate items with and index that ignores invisible items
		let indexedItems = items.map(data => {
			if (!dismissedIDs.has(data.id)) visibleCount++;
			return { ...data, index: visibleCount - 1 };
		});

		//index in list corresponding to the middle of the viewport
		let viewportIndex = Math.floor(scrollLocation * visibleCount);

		//console visualization of scroll window data
		console.log(
			indexedItems
				.map((data, i) => {
					if (dismissedIDs.has(data.id)) return '-';
					return Math.abs(viewportIndex - data.index) > liveZone ? '.' : '*';
				})
				.join('')
		);

		return (
			<div className="list-container">
				<Header
					itemCount={visibleCount}
					dismissedIDs={dismissedIDs}
					fetching={fetching}
				/>
				<div className="list">
					{indexedItems.map((data, i) => (
						<Item
							key={data.id}
							data={data}
							flyweight={Math.abs(viewportIndex - data.index) > liveZone}
							dismissed={dismissedIDs.has(data.id)}
							dismiss={this.dismissID.bind(this)}
						/>
					))}
				</div>
				<Loading fetching={fetching} />
			</div>
		);
	}
}
