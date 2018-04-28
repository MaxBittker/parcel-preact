import timeago from 'timeago.js';

import classnames from 'classnames';
import SwipeableCard from './Swipeable';
import BASE_URL from './fetching';

const ago = timeago();
const PLACEHOLDER_IMG =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+fJ2PQAIngMuRE3dPAAAAABJRU5ErkJggg==';

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
	active,
}) => (
	<div
		className={classnames('item', {
			dismissed,
			released,
			hint,
			active,
		})}
		style={{
			transform: `translate3d(${offset}px, 0px, 0px) ${
				active ? 'scale(1.02)' : ''
			}`,
		}}
	>
		<div className="author">
			<img
				src={flyweight ? PLACEHOLDER_IMG : `${BASE_URL}${author.photoUrl}`}
				alt={author.name}
			/>
			<div>
				<h2>{author.name}</h2>
				<span className="message-date">{ago.format(updated)}</span>
			</div>
		</div>
		<p>{content}</p>
	</div>
);

export { ItemCard };

const Item = ({ flyweight, data, dismissed, dismiss }) =>
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

export default Item;
