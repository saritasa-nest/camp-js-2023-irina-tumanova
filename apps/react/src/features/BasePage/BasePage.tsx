import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import styles from './BasePage.module.css';

const BasePageComponent: FC = () => (
	<Box className={styles['base-page-container']}>
		<Typography sx={{ textAlign: 'center' }} component="h5" variant="h5">
			You haven't chosen anything yet
		</Typography>
	</Box>
);

export const BasePage = memo(BasePageComponent);
