import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Sorting } from '@js-camp/core/models/sorting';

/** Initial state. */
interface InitState<T, R> {

	/** Pagination. */
	readonly pagination: PaginationParams;

	/** Sorting. */
	readonly sorting?: readonly Sorting<T>[];

	/** Filters. */
	readonly filters?: R;
}

/** Types of actions. */
export const enum ParamsActionTypes {
	ChangePagination = 'change_pagination',
	ChangeSorting = 'change_sorting',
	ChangeFilter = 'change_filter',
	ChangeFilterAndSorting = 'change_filter_and_sorting',
}

type Action<T, R> =
	| ChangeSortingAction<T>
	| ChangeFilterAndSortingAction<T, R>
	| ChangePaginationAction
	| ChangeFilterAction<R>;

/** Change sorting type. */
interface ChangeSortingAction<T> {

	/** Action type. */
	readonly type: ParamsActionTypes.ChangeSorting;

	/** Payload. */
	readonly payload: {

		/** Sorting. */
		readonly sorting: readonly Sorting<T>[];

		/** Default pagination. */
		readonly defaultPagination: PaginationParams;
	};
}

/** Change filter action. */
interface ChangeFilterAction<R> {

	/** Action type. */
	readonly type: ParamsActionTypes.ChangeFilter;

	/** Payload. */
	readonly payload: {

		/** Filter. */
		readonly filter: R;

		/** Default pagination. */
		readonly defaultPagination: PaginationParams;
	};
}

interface ChangeFilterAndSortingAction<T, R> {

	/** Action type. */
	readonly type: ParamsActionTypes.ChangeFilterAndSorting;

	/** Payload. */
	readonly payload: {

		/** Filter. */
		readonly filter: R;

		/** Sorting. */
		readonly sorting: readonly Sorting<T>[];

		/** Default pagination. */
		readonly defaultPagination: PaginationParams;
	};
}

/** Change pagination action. */
interface ChangePaginationAction {

	/** Action type. */
	type: ParamsActionTypes.ChangePagination;
}

/**
 * Params reducer.
 * @param state State.
 * @param action Action.
 */
export const paramsReducer = <T, R>(state: InitState<T, R>, action: Action<T, R>): InitState<T, R> => {
	switch (action.type) {
		case ParamsActionTypes.ChangePagination: {
			return {
				...state,
				pagination: { ...state.pagination, pageNumber: state.pagination.pageNumber + 1 },
			};
		}
		case ParamsActionTypes.ChangeSorting: {
			return {
				...state,
				pagination: action.payload.defaultPagination,
				sorting: action.payload.sorting,
			};
		}
		case ParamsActionTypes.ChangeFilter: {
			return {
				...state,
				pagination: action.payload.defaultPagination,
				filters: action.payload.filter,
			};
		}
		case ParamsActionTypes.ChangeFilterAndSorting: {
			return {
				...state,
				pagination: action.payload.defaultPagination,
				filters: action.payload.filter,
				sorting: action.payload.sorting,
			};
		}
		default: {
			return state;
		}
	}
};
