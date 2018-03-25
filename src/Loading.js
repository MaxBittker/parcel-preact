import { h } from 'preact';

export default ({ fetching }) => (
	<div className="loading">{fetching && <div className="throbber" />}</div>
);
