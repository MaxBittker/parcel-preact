import Inferno from 'inferno';
import Component from 'inferno-component';

export default class Header extends Component {
	render({ itemCount, fetching }) {
		return (
			<div className="header">
				{fetching && <span className="throbber" />}
				<span>Items: {itemCount} </span>
			</div>
		);
	}
}
