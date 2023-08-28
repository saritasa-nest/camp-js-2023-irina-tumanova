import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import styles from './NotFoundPage.module.css';

interface Props {

	/** Erorr message. */
	readonly error?: string;
}

/** Not found page. */
const NotFoundPageComponent: FC<Props> = ({ error }) => (
	<Box className={styles['not-found-container']}>
		<Typography sx={{ textAlign: 'center' }} component="h5" variant="h4">
			Oops.. Something went wrong
		</Typography>
		<Typography sx={{ textAlign: 'center' }} component="h2" variant="h5">
			{error}
		</Typography>
	</Box>
);

export const NotFoundPage = memo(NotFoundPageComponent);
