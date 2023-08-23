import { PaginationParams } from '../pagination-params';
import { Sorting } from '../sorting';
import { StudioSortingField } from './studio-sort';

export type QueryStudioParams = PaginationParams &
Sorting<StudioSortingField> & {
	search: string;
};
