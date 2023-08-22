/** Info about navigation item. */
interface NavigationItem {

	/** Name. */
	readonly name: string;

	/** Link. */
	readonly link: string;
}

export const navigationList: readonly NavigationItem[] = [
	{ name: 'Anime', link: '/anime' },
	{ name: 'Genres', link: '/genres' },
	{ name: 'Studios', link: '/studios' },
];
