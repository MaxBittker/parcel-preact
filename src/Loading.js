const Loading = ({ fetching }) => (
	<div className="loading">{fetching && <div className="throbber" />}</div>
);

export default Loading;
