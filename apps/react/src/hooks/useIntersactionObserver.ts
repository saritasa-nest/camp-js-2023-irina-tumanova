import { useEffect } from 'react';

type UseIntersectionObserver = (
	rootNode: HTMLUListElement | null,
	targetNode: HTMLLIElement | null,
	onIntersectCallback: () => void
) => void;

/**
 * Intersaction observer hook.
 * @param rootNode Container of items.
 * @param targetNode Item.
 * @param onIntersectCallback Callback that will work when target item will triggered.
 */
export const useIntersectionObserver: UseIntersectionObserver = (rootNode, targetNode, onIntersectCallback) => {
	useEffect(() => {
		if (rootNode && targetNode) {
			const interceptConfig = {
				root: rootNode,
				threshold: 0,
			};

			const observer = new IntersectionObserver(entries => {
				if (entries.every(entry => entry.isIntersecting)) {
					onIntersectCallback();
				}
			}, interceptConfig);

			observer.observe(targetNode);
			return () => {
				observer.disconnect();
			};
		}
	}, [rootNode, targetNode]);
};
