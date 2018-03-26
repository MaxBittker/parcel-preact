import Inferno from 'inferno';
// import Component from 'inferno-component';

export default ({ fetching }) => (
	<div className="loading">{fetching && <div className="throbber" />}</div>
);
