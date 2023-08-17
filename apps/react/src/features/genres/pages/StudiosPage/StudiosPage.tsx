import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchStudios } from '@js-camp/react/store/studio/dispatchers';
import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studio/selectors';
import { FC, memo, useEffect } from 'react';

import { StudioCard } from '../../components/StudioCard';

const StudiosPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studios = useAppSelector(selectStudios);
	const isLoading = useAppSelector(selectAreStudiosLoading);

	useEffect(() => {
		dispatch(fetchStudios());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<>
			<h1>Studios</h1>
			{studios.map(studio => (
				<StudioCard key={studio.id} studio={studio} />
			))}
		</>
	);
};

export const StudiosPage = memo(StudiosPageComponent);
