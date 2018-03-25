import { Component, h, cloneElement } from 'preact';
import classnames from 'classnames';
import Swipeable from './Swipeable';
import { BASE_URL } from './fetching';

const ItemCard = ({
	author,
	content,
	id,
	light,
	swipe,
	offset,
	released,
	dismissed,
}) => (
	<div
		className={classnames('item', {
			dismissed: swipe || dismissed,
			released,
			light,
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
		<ItemCard {...data} light={light} dismissed={dismissed} key={data.id} />
	) : (
		<Swipeable dismiss={dismiss} key={data.id}>
			<ItemCard {...data} dismissed={dismissed} />
		</Swipeable>
	);
