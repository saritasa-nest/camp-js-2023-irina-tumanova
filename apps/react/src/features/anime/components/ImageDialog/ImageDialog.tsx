import { Dialog } from '@mui/material';
import { FC, memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import styles from './ImageDialog.module.css';

/** Image dialog props. */
export interface ImageDialogProps {

	/** Whether dialog is open or closed. */
	readonly open: boolean;

	/** Closes the dialog. */
	readonly onClose: () => void;

	/** Image source. */
	readonly imageSrc: string;
}

const ImageDialogComponent: FC<ImageDialogProps> = (props: ImageDialogProps) => {
	const { open, onClose, imageSrc } = props;

	return (
		<Dialog onClose={onClose} open={open}>
			<div className={styles['img-wrapper']}>
				<img src={imageSrc} className={styles.img}/>
			</div>
			<button onClick={onClose} className="plain-icon-btn" >
				<CloseIcon />
			</button>
		</Dialog>
	);
};

export const ImageDialog = memo(ImageDialogComponent);
