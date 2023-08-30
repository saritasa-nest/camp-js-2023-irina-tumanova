import { Dispatch, SetStateAction, memo } from 'react';
import { Button, Drawer, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@js-camp/react/store';
import { AnimeFilterParams, AnimeParams } from '@js-camp/core/models/anime/anime-params';
import { AnimeSortingField } from '@js-camp/core/models/anime/anime-sort';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';
import { clearAnimeList } from '@js-camp/react/store/anime/slice';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { MultipleSelect } from '@js-camp/react/components/MultipleSelect';
import { ListFilterForm } from '@js-camp/core/models/list-filter-form';

import styles from './AnimeDrawer.module.css';

interface Props {

	/** Anime. */
	readonly isOpened: boolean;

	/** Closes and opens menu. */
	readonly toggleMenu: () => void;

	/** Set query parameters. */
	readonly setParameters: Dispatch<SetStateAction<AnimeParams>>;

	/** Default firm values. */
	readonly defaultFormValues: ListFilterForm<AnimeType, AnimeSortingField>;

	/** Default params. */
	readonly defaultParams: AnimeParams;
}

/** Anime drawer component. */
const AnimeDrawerComponent = ({
	isOpened,
	toggleMenu,
	setParameters,
	defaultFormValues,
	defaultParams,
}: Props) => {
	const dispatch = useAppDispatch();

	const { register, handleSubmit, control } = useForm<ListFilterForm<AnimeType, AnimeSortingField>>({
		defaultValues: defaultFormValues,
	});

	const onSubmit: SubmitHandler<ListFilterForm<AnimeType, AnimeSortingField>> = ({ types, search, sorting }) => {
		dispatch(clearAnimeList());
		setParameters({
			...defaultParams,
			sorting,
			filters: new AnimeFilterParams({ types, search }),
		});
		toggleMenu();
	};

	return (
		<Drawer open={isOpened} onClose={toggleMenu}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<TextField label="Search" {...register('search')} />
				<MultipleSelect
					name="types"
					toReadable={AnimeType.toReadable}
					control={control}
					items={AnimeType.toArray()}
					title="Filter"
				/>
				<MultipleSort
					name="sorting"
					control={control}
					title="Sorting"
					toReadable={AnimeSortingField.toReadable}
				/>
				<Button type="submit">Apply</Button>
			</form>
		</Drawer>
	);
};

export const AnimeDrawer = memo(AnimeDrawerComponent);
