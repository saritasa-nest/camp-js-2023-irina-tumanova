import { memo, forwardRef, ReactNode } from 'react';

import { List } from '@mui/material';
import { useIntersectionObserver } from '@js-camp/react/hooks/useIntersactionObserver';

/** Props. */
interface InfinityScrollProps {
	/** Ref to last item in array. */
	readonly lastItemRef: React.MutableRefObject<HTMLLIElement | null>;

	/** Trigger function to continue pagination. */
	readonly handleObserve: () => void;

	/** Array of items that need to be paginated. */
	readonly children: ReactNode;
}

/** Infinity scroll component. */
const InfinityScrollComponent = forwardRef<HTMLUListElement | null, InfinityScrollProps>(
	({ lastItemRef, handleObserve, children }, rootRef) => {
		useIntersectionObserver(rootRef, lastItemRef, handleObserve);

		return (
			<List ref={rootRef} sx={{ width: '100%', maxHeight: '100%', maxWidth: 360, overflowY: 'auto' }}>
				{children}
			</List>
		);
	}
);

export const InfinityScroll = memo(InfinityScrollComponent);
