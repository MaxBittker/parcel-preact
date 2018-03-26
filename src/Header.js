import { Component, h, cloneElement } from 'preact';

export default class Header extends Component {
	render({ items, fetching }) {
		return (
			<div className="header">
				{fetching && <span className="throbber" />}
				<span>Items: {items.length} </span>
			</div>
		);
	}
}
