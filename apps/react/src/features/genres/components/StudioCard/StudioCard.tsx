import { Studio } from '@js-camp/core/models/anime/studio';
import { FC, memo } from 'react';

interface Props {

	/** Studio. */
	readonly studio: Studio;
}

const StudioCardComponent: FC<Props> = ({ studio }) => (
	<div>
		<h2>{studio.name}</h2>
		<span>ID - {studio.id}</span>
	</div>
);

export const StudioCard = memo(StudioCardComponent);
