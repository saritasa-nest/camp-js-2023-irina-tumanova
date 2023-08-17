import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchStudios } from '@js-camp/react/store/studio/dispatchers';
import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studio/selectors';
import { FC, memo, useEffect } from 'react';

import List from '@mui/material/List';
import { Box, CssBaseline, Divider, Drawer } from '@mui/material';

import { StudioCard } from '../../components/StudioCard';

const StudiosPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studios = useAppSelector(selectStudios);
	const isLoading = useAppSelector(selectAreStudiosLoading);

	const drawerWidth = 300;

	useEffect(() => {
		dispatch(fetchStudios());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Drawer
				variant="permanent"
				anchor="left"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
				}}
			>
				<List>
					{studios.map(studio => (
						<StudioCard key={studio.id} studio={studio} />
					))}
				</List>
				<Divider />
			</Drawer>
			<div>
				<h2>There should be a name of some studio...</h2>
			</div>
		</Box>
	);
};

export const StudiosPage = memo(StudiosPageComponent);
