import { Component, h, cloneElement } from 'preact';
import classnames from 'classnames';
import Swipeable from './Swipeable';
import { BASE_URL } from './fetching';

const ItemCard = ({
	author,
	content,
	id,
	light,
	offset,
	dismissed,
	released,
	hint,
}) => (
	<div
		className={classnames('item', {
			dismissed,
			released,
			light,
			hint,
		})}
		style={{ left: `${offset}px` }}
	>
		<div className="author">
			<img src={`${BASE_URL}${author.photoUrl}`} alt={author.name} />
			<span className="author-name">{author.name}</span>
		</div>
		<h1>{id}</h1>
		<p>{content}</p>
	</div>
);

export default ({ light, data, dismissed, dismiss }) =>
	light ? (
		<ItemCard {...data} light dismissed={dismissed} key={data.id} />
	) : (
		<Swipeable dismiss={dismiss} key={data.id} id={data.id}>
			<ItemCard {...data} dismissed={dismissed} />
		</Swipeable>
	);
