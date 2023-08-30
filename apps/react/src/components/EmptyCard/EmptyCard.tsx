import { FC } from 'react';
import { ListItem, ListItemText } from '@mui/material';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

const EmptyCardComponent: FC = () => (
	<ListItem>
		<ListItemText primary={'Try more!'} secondary={'Nothing found'} />
	</ListItem>
);

export const EmptyCard = typedMemo(EmptyCardComponent);
