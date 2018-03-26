import Inferno from 'inferno';
import Component from 'inferno-component';

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
