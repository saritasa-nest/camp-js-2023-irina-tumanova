import { memo, FC } from 'react';
import { Anime } from '@js-camp/core/models/anime/anime';

import styles from './AnimeCard.module.css';

interface Props {

	/** Genre. */
	readonly anime: Anime;
}

/** Card with genre data. */
const AnimeCardComponent: FC<Props> = ({ anime }) => (
	<div className={styles.card}>
		<span>English title: {anime.titleEnglish}</span>
		<span>Japanese title: {anime.titleJapanese}</span>
		<span>Id: {anime.id}</span>
	</div>
);

export const AnimeCard = memo(AnimeCardComponent);
