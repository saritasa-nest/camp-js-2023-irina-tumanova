import { FC, useRef, useState } from 'react';
import { Alert, Avatar, Box, Button } from '@mui/material';
import clsx from 'clsx';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

import styles from './AvatarUpload.module.css';

interface Props {

	/** Avatar image url. */
	readonly imageUrl: string | null;

	/** Change avatar image. */
	readonly changeImage: (image: File | null) => void;

	/** Is disable. */
	readonly disable?: boolean;

	/** Class name. */
	readonly className?: string;
}

/** Max image file size - 60 Kb. */
const MAX_IMAGE_FILE_SIZE = 1024 * 60;

/** Accept image file types. */
const ACCEPT_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Error display time. */
const ERROR_DISPLAY_TIME = 1000 * 3;

/**
 * Avatar upload component.
 * @param props Props.
 */
const AvatarUploadComponent: FC<Props> = ({ imageUrl, changeImage, disable, className }) => {
	const [error, setError] = useState<string | null>(null);
	const errorTimer = useRef<typeof setTimeout | null>(null);

	/**
	 * Upload avatar image.
	 * @param event Change event.
	 */
	const uploadImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
		clearImageError();

		const file = event.target.files?.[0];
		if (file === undefined) {
			return;
		}

		const imageError = checkImageErrors(file);
		if (imageError !== null) {
			setImageErrorWithTimer(imageError);
			return;
		}

		changeImage(file);
	};

	/** Clear image error. */
	const clearImageError = (): void => {
		setError(null);
		errorTimer.current = null;
	};

	/**
	 * Check image errors.
	 * @param file Uploaded file.
	 */
	const checkImageErrors = (file: File): string | null => {
		if (!ACCEPT_FILE_TYPES.includes(file.type)) {
			return 'Accept image type: jpeg/jpg, png, webp';
		}
		if (file.size > MAX_IMAGE_FILE_SIZE) {
			return 'Max file size - 60 Kb';
		}
		return null;
	};

	/**
	 * Set image error with timer.
	 * @param imageError Image error.
	 */
	const setImageErrorWithTimer = (imageError: string): void => {
		setError(imageError);
		errorTimer.current = setTimeout(clearImageError, ERROR_DISPLAY_TIME);
	};

	/** Delete image. */
	const deleteImage = (): void => {
		changeImage(null);
	};

	return (
		<Box className={clsx(styles['avatar-upload'], className)}>
			<Avatar alt="Current user avatar"
				className={styles['avatar-upload__avatar']}
				src={imageUrl ?? undefined} />
			{!disable &&
				<Box className={styles['avatar-upload__actions']}>
					<Button component={Box}>
						Upload
						<input type="file"
							onChange={uploadImage}
							accept={ACCEPT_FILE_TYPES.join(', ')}
							className={styles['avatar-upload__input']} />
					</Button>
					<Button color="error" onClick={deleteImage}>Delete</Button>
				</Box>}
			{error !== null &&
				<Alert severity="error" className={styles['avatar-upload__error']}>
					{error}
				</Alert>}
		</Box>
	);
};

export const AvatarUpload = typedMemo(AvatarUploadComponent);
