const Header = ({ count }) => (
	<div className="header">
		<svg
			onClick={() => {
				this.setState({ drawer: open });
			}}
			height="30px"
			id="Layer_1"
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

export default Header;
