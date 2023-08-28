import { memo, forwardRef } from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Genre } from '@js-camp/core/models/genre/genre';
import { GenreType } from '@js-camp/core/models/genre/genre-type';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { clearGenreDetailsErrorsState } from '@js-camp/react/store/genre-details/slice';
import { selectGenreDetailsErrors } from '@js-camp/react/store/genre-details/selectors';

import styles from './GenreCard.module.css';

interface Props {

	/** Genre. */
	readonly genre: Genre;
}

/** Card with genre data. */
const GenreCardComponent = forwardRef<HTMLLIElement | null, Props>(({ genre }, forwardedRef) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const errors = useAppSelector(selectGenreDetailsErrors);

	const handleNavigateToDetails = () => {
		if (errors) {
			dispatch(clearGenreDetailsErrorsState());
		}
		navigate(`${genre.id}`);
	};

	return (
		<ListItem className={styles['card-container']} ref={forwardedRef} onClick={handleNavigateToDetails}>
			<ListItemText
				primary={genre.name}
				secondary={
					<Typography component="span" variant="body2" color="text.primary">
						{GenreType.toReadable(genre.type)}
					</Typography>
				}
			/>
		</ListItem>
	);
});

export const GenreCard = memo(GenreCardComponent);
