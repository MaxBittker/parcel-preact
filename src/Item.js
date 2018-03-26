import Inferno from 'inferno';
import Component from 'inferno-component';

import { distanceInWords } from 'date-fns';

import classnames from 'classnames';
import SwipeableCard from './Swipeable';
import { BASE_URL } from './fetching';

const PLACEHOLDER_IMG =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const ItemCard = ({
	author,
	updated,
	content,
	id,
	offset,
	dismissed,
	released,
	flyweight,
	hint,
}) => (
	<div
		className={classnames('item', {
			dismissed,
			released,
			flyweight,
			hint,
		})}
		style={{ left: `${offset}px` }}
	>
		<div className="author">
			<img
				src={flyweight ? PLACEHOLDER_IMG : `${BASE_URL}${author.photoUrl}`}
				alt={author.name}
			/>
			<span className="author-name">{author.name}</span>
		</div>
		<h1>{id}</h1>
		<span>{distanceInWords(new Date(updated), new Date())}</span>
		<p>{content}</p>
	</div>
);

export { ItemCard };

export default ({ flyweight, data, dismissed, dismiss }) =>
	flyweight ? (
		<ItemCard {...data} flyweight dismissed={dismissed} key={data.id} />
	) : (
		<SwipeableCard
			dismiss={dismiss}
			dismissed={dismissed}
			key={data.id}
			id={data.id}
			data={data}
		/>
	);
