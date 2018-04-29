import Component from 'inferno-component';

import { get } from 'axios';
import BASE_URL from './fetching';
import debounce from 'lodash.debounce';

import Item from './Item';
import Loading from './Loading';
import Header from './Header';

export default class List extends Component {
	state = {
		scrollLocation: 0,
		items: [],
		dismissedIDs: new Set(),
		lastDismissed: undefined,
	};

	componentDidMount() {
		document.addEventListener('scroll', this.onScroll);
		this.fetchItems();
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll);
	}

	onScroll = () => {
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

	//this triggers renders, so don't let it fire during active scrolling
	updateLocation = debounce(scrollLocation => {
		this.setState({ scrollLocation });
	}, 50);

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
		let { messages, pageToken } = data;
		this.setState({
			items: [...items, ...messages],
			fetching: false,
			lastPageToken: pageToken,
		});
		this.onScroll();
	};

	//callback for tracking dismissed ids
	dismissID(id) {
		this.setState(
			({ dismissedIDs }) => ({
				lastDismissed: id,
				dismissedIDs: dismissedIDs.add(id),
			}),
			// see if we need to refetch
			this.onScroll
		);
	}

	restore = () => {
		this.setState({ dismissedIDs: new Set() }, this.onScroll);
	};

	restoreLast = () => {
		this.setState(
			({ dismissedIDs, lastDismissed }) => ({
				dismissedIDs: (dismissedIDs.delete(lastDismissed), dismissedIDs),
			}),
			// see if we need to refetch
			this.onScroll
		);
	};

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
		return (
			<div className="list-container">
				<Header
					dismissedIDs={dismissedIDs}
					restore={this.restore}
					restoreLast={this.restoreLast}
				/>
				<div className="list">
					{indexedItems.map(data => (
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
