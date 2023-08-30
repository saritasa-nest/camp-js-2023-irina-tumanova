import { memo, useState, useCallback, Dispatch } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { selectAnime, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppSelector } from '@js-camp/react/store';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';
import { AnimeFilterParams } from '@js-camp/core/models/anime/anime-params';
import { ParamsActionTypes, ParamsActions } from '@js-camp/react/utils/parametersReducer';
import { AnimeSortingField } from '@js-camp/core/models/anime/anime-sort';
import { EmptyCard } from '@js-camp/react/components/EmptyCard';

import styles from './AnimeAsideList.module.css';
import { DefaultAnimeCard, RefAnimeCard } from '../AnimeCards';

interface Props {

	/** Closes and opens filter menu. */
	readonly toggleMenu: () => void;

	/** Set query parameters. */
	readonly paramsDispatch: Dispatch<ParamsActions<AnimeSortingField, AnimeFilterParams>>;
}

/** Anime aside list component. */
const AnimeAsideListComponent = ({ toggleMenu, paramsDispatch }: Props) => {
	const animeList = useAppSelector(selectAnime);
	const isLoading = useAppSelector(selectIsAnimeLoading);

	const [lastItemNode, setLastItemNode] = useState<HTMLLIElement | null>(null);

	const getNextPaginationData = () => {
		paramsDispatch({
			type: ParamsActionTypes.ChangePagination,
		});
	};

	const getLastAnimeNode = useCallback((node: HTMLLIElement) => {
		setLastItemNode(node);
	}, []);

	return (
		<aside className={styles.aside}>
			{isLoading && animeList.length === 0 && <AppShadowLoader />}
			<IconButton onClick={toggleMenu}>
				<Menu />
			</IconButton>
			<InfinityScroll lastItemNode={lastItemNode} onObserve={getNextPaginationData}>
				{animeList.length === 0 && !isLoading && <EmptyCard />}
				{animeList.map((anime, index) => (
					<Box key={anime.id}>
						{index === animeList.length - 1 ? (
							<DefaultAnimeCard anime={anime} />
						) : (
							<RefAnimeCard ref={getLastAnimeNode} anime={anime} />
						)}
						<Divider />
					</Box>
				))}
			</InfinityScroll>
		</aside>
	);
};

export const AnimeAsideList = memo(AnimeAsideListComponent);
