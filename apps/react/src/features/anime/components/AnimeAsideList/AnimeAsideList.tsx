import { memo, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { selectAnime, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppSelector } from '@js-camp/react/store';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';
import { AnimeParams } from '@js-camp/core/models/anime/anime-params';

import styles from './AnimeAsideList.module.css';
import { AnimeCard } from '../../components/AnimeCard';

interface Props {

	/** Closes and opens filter menu. */
	readonly toggleMenu: () => void;

	/** Set query parameters. */
	readonly setParameters: Dispatch<SetStateAction<AnimeParams>>;
}

/** Anime aside list component. */
const AnimeAsideListComponent = ({ toggleMenu, setParameters }: Props) => {
	const animeList = useAppSelector(selectAnime);
	const isLoading = useAppSelector(selectIsAnimeLoading);

	const [lastItemNode, setLastItemNode] = useState<HTMLLIElement | null>(null);

	const getNextPaginationData = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	const getLastAnimeNode = useCallback((node: HTMLLIElement) => {
		setLastItemNode(node);
	}, []);

	return (
		<aside className={styles.aside}>
			<IconButton onClick={toggleMenu}>
				<Menu />
			</IconButton>
			<InfinityScroll lastItemNode={lastItemNode} onObserve={getNextPaginationData}>
				<>
					{isLoading && animeList.length === 0 && <AppShadowLoader />}
					{animeList.map((anime, index) => (
						<Box key={anime.id}>
							<AnimeCard
								ref={index === animeList.length - 1 ? getLastAnimeNode : null}
								anime={anime}
							/>
							<Divider />
						</Box>
					))}
				</>
			</InfinityScroll>
		</aside>
	);
};

export const AnimeAsideList = memo(AnimeAsideListComponent);
