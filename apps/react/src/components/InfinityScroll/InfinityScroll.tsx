import { memo, FC, ReactNode, useState, useCallback } from 'react';
import { List } from '@mui/material';

import { useIntersectionObserver } from '@js-camp/react/hooks/useIntersactionObserver';

/** Props. */
interface InfinityScrollProps {

	/** Node of last item in array. */
	readonly lastItemNode: HTMLLIElement | null;

	/** Trigger function to continue pagination. */
	readonly onObserve: () => void;

	/** Array of items that need to be paginated. */
	readonly children: ReactNode;
}

/** Infinity scroll component. */
const InfinityScrollComponent: FC<InfinityScrollProps> = ({ lastItemNode, onObserve, children }) => {
	const [rootNode, setRootNode] = useState<HTMLUListElement | null>(null);
	useIntersectionObserver(rootNode, lastItemNode, onObserve);

	const getRootNode = useCallback((node: HTMLUListElement) => {
		setRootNode(node);
	}, []);

	return (
		<List ref={getRootNode} sx={{ maxHeight: '100%', overflowY: 'auto' }}>
			{children}
		</List>
	);
};

export const InfinityScroll = memo(InfinityScrollComponent);
