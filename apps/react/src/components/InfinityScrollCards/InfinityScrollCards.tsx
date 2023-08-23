import { memo, FC, ReactNode, useRef, MutableRefObject } from 'react';
import { Box, List } from '@mui/material';

import { useIntersectionObserver } from '@js-camp/react/hooks/useIntersactionObserver';

/** Props. */
interface InfinityScrollProps {

	/** Ref to last item in array. */
	readonly lastItemRef: MutableRefObject<HTMLLIElement | null>;

	/** Trigger function to continue pagination. */
	readonly handleObserve: () => void;

	/** Array of items that need to be paginated. */
	readonly children: ReactNode;
}

/** Infinity scroll component. */
const InfinityScrollComponent: FC<InfinityScrollProps> = ({ lastItemRef, handleObserve, children }) => {
	const rootRef = useRef<HTMLUListElement | null>(null);
	useIntersectionObserver(rootRef, lastItemRef, handleObserve);

	return (
		<Box sx={{ position: 'relative', flex: 1, display: 'flex', width: '100%' }}>
			<List ref={rootRef} sx={{ overflowY: 'auto', position: 'absolute', inset: 0 }}>
				{children}
			</List>
		</Box>
	);
};

export const InfinityScroll = memo(InfinityScrollComponent);
