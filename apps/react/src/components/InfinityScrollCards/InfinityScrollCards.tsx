import { memo, FC, ReactNode, useRef, MutableRefObject } from 'react';
import { List } from '@mui/material';

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
		<List ref={rootRef} sx={{ maxHeight: '100%', overflowY: 'auto' }}>
			{children}
		</List>
	);
};

export const InfinityScroll = memo(InfinityScrollComponent);
