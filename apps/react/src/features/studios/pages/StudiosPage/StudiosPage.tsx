import { Box, Drawer, IconButton, TextField, Button, Divider } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchStudios } from '@js-camp/react/store/studio/dispatchers';
import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studio/selectors';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { StudioSortingField } from '@js-camp/core/models/studio/studio-sort';
import { SortDirection, Sorting } from '@js-camp/core/models/sorting';
import { StudioFilterParams, StudioParams } from '@js-camp/core/models/studio/studio-params';
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { clearStudios, clearStudiosState } from '@js-camp/react/store/studio/slice';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';

import styles from './StudiosPage.module.css';
import { StudioCard } from '../../components/StudioCard/StudioCard';

const studioSortingFields: readonly Sorting<StudioSortingField>[] = [
	{ field: StudioSortingField.Name, direction: SortDirection.None },
	{ field: StudioSortingField.Modified, direction: SortDirection.None },
];

const defaultParams: StudioParams = {
	pagination: new PaginationParams({ pageSize: 15, pageNumber: 0 }),
	sorting: studioSortingFields,
	filters: new StudioFilterParams({ search: '' }),
};

interface FormValues {

	/** Studio. */
	readonly search: string;

	/** Sorting. */
	readonly sorting: readonly Sorting<StudioSortingField>[];
}

const defaultFormValues: FormValues = {
	search: '',
	sorting: studioSortingFields,
};

const StudiosPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studios = useAppSelector(selectStudios);
	const isLoading = useAppSelector(selectAreStudiosLoading);

	const [isMenuOpen, setIsOpenMenu] = useState(false);
	const [parameters, setParameters] = useState<StudioParams>(defaultParams);

	const [lastItemNode, setLastItemNode] = useState<HTMLLIElement | null>(null);

	useEffect(() => {
		dispatch(clearStudiosState());
	}, []);

	useEffect(() => {
		dispatch(fetchStudios(parameters));
	}, [parameters]);

	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const getNextPagination = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	const toggleMenu = () => {
		setIsOpenMenu(prevState => !prevState);
	};

	const onSubmit: SubmitHandler<FormValues> = ({ search, sorting }) => {
		dispatch(clearStudios());
		setParameters({
			...defaultParams,
			sorting,
			filters: new StudioFilterParams({ search }),
		});
		toggleMenu();
	};

	const getLastItemNode = useCallback((node: HTMLLIElement) => {
		setLastItemNode(node);
	}, []);

	return (
		<Box sx={{ flex: 1, display: 'flex' }}>
			<Drawer open={isMenuOpen} onClose={toggleMenu}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField label="Search" {...register('search')}></TextField>
					<MultipleSort
						name={'sorting'}
						control={control}
						title={'Sorting'}
						toReadable={StudioSortingField.toReadable}
					/>
					<Button type="submit">Apply</Button>
				</form>
			</Drawer>
			<aside className={styles.aside}>
				<IconButton onClick={toggleMenu}>
					<Menu />
				</IconButton>
				<InfinityScroll lastItemNode={lastItemNode} onObserve={getNextPagination}>
					<>
						{isLoading && studios.length === 0 && <AppShadowLoader />}
						{studios.map((studio, index) => (
							<Box key={studio.id}>
								<StudioCard ref={index === studios.length - 1 ? getLastItemNode : null} studio={studio} />
								<Divider />
							</Box>
						))}
					</>
				</InfinityScroll>
			</aside>
			<Outlet />
		</Box>
	);
};

export const StudiosPage = memo(StudiosPageComponent);
