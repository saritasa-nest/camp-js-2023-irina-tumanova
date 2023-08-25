import {
	Box,
	Drawer,
	IconButton,
	TextField,
	Button,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchStudios } from '@js-camp/react/store/studio/dispatchers';
import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studio/selectors';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { StudioSortingField } from '@js-camp/core/models/studio/studio-sort';
import { Sorting } from '@js-camp/core/models/sorting';
import { StudioFilterParams, StudioParams } from '@js-camp/core/models/studio/studio-params';
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { clearStudios } from '@js-camp/react/store/studio/slice';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';

import styles from './StudiosPage.module.css';
import { StudioCard } from '../../components/StudioCard/StudioCard';

const studioSortingFields: Sorting<StudioSortingField>[] = [
	{ field: StudioSortingField.Name, direction: '' },
	{ field: StudioSortingField.Modified, direction: '' },
];

const defaultParams: StudioParams = {
	pagination: new PaginationParams({ pageSize: 20, pageNumber: 0 }),
	sorting: studioSortingFields,
	filters: new StudioFilterParams({ search: '' }),
};

interface FormValues {

	/** Studio. */
	search: string;

	/** Sorting. */
	sorting: Sorting<StudioSortingField>[];
}

const defaultFormValues: FormValues = {
	search: '',
	sorting: studioSortingFields,
};

const StudiosPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studios = useAppSelector(selectStudios);
	const isLoading = useAppSelector(selectAreStudiosLoading);

	const [parameters, setParameters] = useState<StudioParams>(defaultParams);
	const [isMenuOpen, setIsOpenMenu] = useState(false);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	useEffect(() => {
		dispatch(fetchStudios(parameters));
	}, [parameters]);

	const handleObserve = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	const form = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const { register, handleSubmit, control } = form;

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
	}

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
				<InfinityScroll lastItemRef={lastItemRef} onObserve={handleObserve}>
					<>
						{isLoading && studios.length === 0 && <AppShadowLoader />}
						{studios.map((studio, index) => (
							<StudioCard ref={index === studios.length - 1 ? lastItemRef : null} key={studio.id} studio={studio} />
						))}
					</>
				</InfinityScroll>
			</aside>
		</Box>
	);
};

export const StudiosPage = memo(StudiosPageComponent);
