import { MutableRefObject, useEffect } from 'react';

type UseIntersectionObserver = (
	rootRef: MutableRefObject<HTMLUListElement | null>,
	targetRef: MutableRefObject<HTMLLIElement | null>,
	onIntersectCallback: () => void
) => void;

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
