import { Sorting } from './sorting';

/** Form values. */
export interface ListFilterForm<T, TSortingField> {

	/** Anime types. */
	readonly types: T[];

	/** Search. */
	readonly search: string;

	/** Anime sorting field. */
	readonly sorting: readonly Sorting<TSortingField>[];
}
