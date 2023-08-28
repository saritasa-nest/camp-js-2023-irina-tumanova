import { memo, FC, ReactNode, useState, useCallback } from 'react';
import { Box, List } from '@mui/material';

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
	const handleSetNode = useCallback((node: HTMLUListElement): void => {
		setRootNode(node);
	}, []);

	return (
		<Box sx={{ position: 'relative', flex: 1, display: 'flex', width: '100%' }}>
			<List ref={handleSetNode} sx={{ overflowY: 'auto', position: 'absolute', inset: 0 }}>
				{children}
			</List>
		</Box>
	);
};

export const InfinityScroll = memo(InfinityScrollComponent);
