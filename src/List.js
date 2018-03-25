import { Component, h } from 'preact';
import { get } from 'axios';
import { BASE_URL } from './fetching';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import Item from './Item';
import Loading from './Loading';
import Header from './Header';

export default class List extends Component {
	state = { itemLocation: 0, items: [], dismissedIDs: new Set() };

	componentDidMount() {
		document.addEventListener('scroll', this.onScroll);
		this.fetchItems();
	}
	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScroll);
	}

	onScroll = e => {
		let { scrollHeight } = this.base;
		let { scrollY, innerHeight } = window;

		if (scrollY > scrollHeight - innerHeight * 5) {
			this.fetchItems();
		}
		this.updateLocation(scrollY / scrollHeight);
	};

	updateLocation = throttle(itemLocation => {
		this.setState({ itemLocation });
	}, 200);

	fetchItems() {
		let { lastPageToken, fetching } = this.state;
		if (fetching) return;
		this.setState({ fetching: true });

		get(`${BASE_URL}/messages`, {
			params: {
				limit: 500,
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
		let { items = [] } = this.state;
		let { count, messages, pageToken } = data;
		let { scrollY } = window;
		this.setState(
			{
				items: [...items, ...messages],
				fetching: false,
				lastPageToken: pageToken,
			},
			() => {
				var distanceFromBottom =
					document.body.scrollHeight - window.innerHeight - window.scrollY;
				if (distanceFromBottom < 100) {
					// window.scrollTo(0, window.scrollY - 200);
				}
			}
		);
	};
	dismissID(id) {
		this.setState(
			({ dismissedIDs }) => ({
				dismissedIDs: dismissedIDs.add(id),
			}),
			this.onScroll
		);
	}
	render({}, { itemLocation, items, fetching, dismissedIDs }) {
		let filteredItems = items.filter(({ id }) => !dismissedIDs.has(id));
		let apl = Math.floor(itemLocation * items.length);
		console.log(
			items
				.map((data, i) => {
					let dismissed = dismissedIDs.has(data.id);

					if (dismissed) {
						apl++;
						return '-';
					}
					return Math.abs(apl - i) > 25 ? '.' : '*';
				})
				.join('')
		);

		apl = Math.floor(itemLocation * items.length);

		return (
			<div className="list-container">
				<Header items={filteredItems} fetching={fetching} />
				<div className="list">
					{items.map((data, i) => {
						let dismissed = dismissedIDs.has(data.id);
						if (dismissed) apl++;
						return (
							<Item
								key={data.id}
								light={Math.abs(apl - i) > 25}
								data={data}
								dismissed={dismissedIDs.has(data.id)}
								dismiss={this.dismissID.bind(this, data.id)}
							/>
						);
					})}
				</div>
				<Loading fetching={fetching} />
			</div>
		);
	}
}
