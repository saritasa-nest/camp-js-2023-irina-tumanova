import { FC, memo, useEffect } from 'react';
import { Box, CssBaseline, Divider, Drawer, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchStudios } from '@js-camp/react/store/studio/dispatchers';
import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studio/selectors';

import { StudioList } from '../../components/StudioList/StudioList';

const StudiosPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studios = useAppSelector(selectStudios);
	const isLoading = useAppSelector(selectAreStudiosLoading);

	useEffect(() => {
		dispatch(fetchStudios());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Drawer
				variant="permanent"
				anchor="left"
				sx={{
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
				}}
			>
				<StudioList studios={studios} />
				<Divider />
			</Drawer>
			<Box>
				<Typography variant='h5' component='h5'>There should be a name of some studio...</Typography>
			</Box>
		</Box>
	);
};

export const StudiosPage = memo(StudiosPageComponent);
