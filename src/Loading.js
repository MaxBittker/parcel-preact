import Inferno from 'inferno';

export default ({ fetching }) => (
	<div className="loading">{fetching && <div className="throbber" />}</div>
);
