import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchStudios } from '@js-camp/react/store/studio/dispatchers';
import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studio/selectors';
import { FC, memo, useEffect } from 'react';
import { Box, CssBaseline, Divider, Drawer } from '@mui/material';

import { StudioList } from '../../components/StudioList/StudioList';

const StudiosPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const studios = useAppSelector(selectStudios);
	const isLoading = useAppSelector(selectAreStudiosLoading);
	const drawerWidth = 400;

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
				<StudioList studios={studios}/>
				<Divider />
			</Drawer>
			<div>
				<h2>There should be a name of some studio...</h2>
			</div>
		</Box>
	);
};

export const StudiosPage = memo(StudiosPageComponent);
