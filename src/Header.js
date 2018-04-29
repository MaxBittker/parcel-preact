import Component from 'inferno-component';
import classnames from 'classnames';

const Drawer = ({ open, dismissedIDs, closeDrawer, restoreLast, restore }) => (
	<div
		className={classnames('drawer-backdrop', { open })}
		onClick={closeDrawer}
		onTouchStart={closeDrawer}
	>
		<div
			className={classnames('drawer', { open })}
			onClick={e => e.stopPropagation()}
			onTouchStart={e => e.stopPropagation()}
		>
			<h3> Dismissed Messages: {dismissedIDs.size}</h3>
			<button onClick={restoreLast}>
				<h3>Restore Last</h3>
			</button>
			<button onClick={restore}>
				<h3>Restore All</h3>
			</button>
		</div>
	</div>
);

export default class Header extends Component {
	state = { drawerOpen: false };

	openDrawer = () => {
		this.setState({ drawerOpen: true });
	};
	closeDrawer = () => {
		this.setState({ drawerOpen: false });
	};

	render({ dismissedIDs, restoreLast, restore }, { drawerOpen }) {
		return (
			<div className="header">
				<Drawer
					open={drawerOpen}
					dismissedIDs={dismissedIDs}
					closeDrawer={this.closeDrawer}
					restoreLast={restoreLast}
					restore={restore}
				/>
				<svg
					onClick={this.openDrawer}
					onTouchEnd={this.openDrawer}
					height="30px"
					version="1.1"
					viewBox="0 0 30 30"
					width="30px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M 7 10 L 25 10z" />
					<path d="M 7 15 L 25 15z" />
					<path d="M 7 20 L 25 20z" />
				</svg>

				<h1> Messages</h1>
			</div>
		);
	}
}
