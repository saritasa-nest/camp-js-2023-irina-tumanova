import { MutableRefObject, useEffect } from 'react';

type UseIntersectionObserver = (
	rootRef: MutableRefObject<HTMLUListElement | null>,
	targetRef: MutableRefObject<HTMLLIElement | null>,
	onIntersectCallback: () => void
) => void;

/**
 * Intersaction observer hook.
 * @param rootRef List ref in other words container.
 * @param targetRef Last item in list.
 * @param onIntersectCallback Callback that will work when target item will triggered.
 */
export const useIntersectionObserver: UseIntersectionObserver = (rootRef, targetRef, onIntersectCallback) => {
	useEffect(() => {
		if (rootRef.current && targetRef.current) {
			const interceptConfig = {
				root: rootRef.current,
				threshold: 0,
			};

			const observer = new IntersectionObserver(entries => {
				if (entries.every(entry => entry.isIntersecting)) {
					onIntersectCallback();
				}
			}, interceptConfig);

			observer.observe(targetRef.current);
			return () => {
				observer.disconnect();
			};
		}
	}, [rootRef.current, targetRef.current]);
};
