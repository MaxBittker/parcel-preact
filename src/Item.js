import Inferno from 'inferno';
import Component from 'inferno-component';

import classnames from 'classnames';
import SwipeableCard from './Swipeable';
import { BASE_URL } from './fetching';

const ItemCard = ({
	author,
	content,
	id,
	offset,
	dismissed,
	released,
	light,
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

export { ItemCard };

export default ({ light, data, dismissed, dismiss }) =>
	light ? (
		<ItemCard {...data} light dismissed={dismissed} key={data.id} />
	) : (
		<SwipeableCard
			dismiss={dismiss}
			dismissed={dismissed}
			key={data.id}
			id={data.id}
			data={data}
		/>
	);
