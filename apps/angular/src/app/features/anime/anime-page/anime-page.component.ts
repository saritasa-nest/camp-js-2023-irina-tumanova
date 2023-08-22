import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NonNullableFormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, startWith, merge, combineLatest, finalize, withLatestFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime, AnimeType } from '@js-camp/core/models/anime/anime';
import { AnimeSortingField, AnimeParams, AnimeFilterParams, QueryAnimeParams } from '@js-camp/core/models/anime/anime-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sorting } from '@js-camp/core/models/sorting';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { enumToArray } from '@js-camp/core/utils/enum-to-array';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { QueryParamsOf } from '@js-camp/core/models/query-params-of';
import { QueryParamsOfMapper } from '@js-camp/core/mappers/query-params-off.mapper';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 10, pageNumber: 0 }),
	sorting: new Sorting({ field: AnimeSortingField.None, direction: 'asc' }),
	filters: new AnimeFilterParams({ types: [], search: '' }),
};

const REQUEST_DEBOUNCE_TIME = 500;

/** Anime list page. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './anime-page.component.html',
	styleUrls: ['./anime-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePageComponent implements OnInit {

	/** Columns in a table. */
	protected readonly displayedColumns: readonly string[] = ['image', 'titleEnglish', 'titleJapanese', 'aired.start', 'type', 'status'];

	/** Page size options. */
	protected readonly pageSizeOptions: readonly number[] = [5, 10, 20];

	/** Anime type options. */
	protected readonly animeTypes = enumToArray(AnimeType);

	/** Anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Anime is loading. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Sorting: field and direction. */
	protected readonly sorting$: BehaviorSubject<Sorting<AnimeSortingField>>;

	/** Pagination. */
	protected readonly pagination$: BehaviorSubject<PaginationParams>;

	/** Filters form: search and type filter. */
	protected readonly filtersForm: FormGroupOf<AnimeFilterParams>;

	private readonly untilDestroyed = untilDestroyed();

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	@Inject(DOCUMENT) private readonly window = inject(DOCUMENT).defaultView;

	public constructor() {
		const paramsFromQuery = this.mapQueryParamsToAnimeParams(this.route.snapshot.queryParams);

		this.filtersForm = this.createFiltersForm(paramsFromQuery.filters);
		this.pagination$ = new BehaviorSubject(paramsFromQuery.pagination);
		this.sorting$ = new BehaviorSubject(paramsFromQuery.sorting);

		this.animeList$ = this.createAnimeListStream();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		const resetPaginationSideEffect$ = this.filtersForm.valueChanges.pipe(
			withLatestFrom(this.pagination$),
			tap(([_filters, pagination]) => this.pagination$.next({ ...pagination, pageNumber: defaultParams.pagination.pageNumber })),
		);

		const scrollToTopAfterChangePageSideEffect$ = this.pagination$.pipe(
			tap(() => this.scrollToTopPage()),
		);

		merge(resetPaginationSideEffect$, scrollToTopAfterChangePageSideEffect$)
			.pipe(this.untilDestroyed())
			.subscribe();
	}

	/**
	 * Change paginator data.
	 * @param event Page event.
	 * @param prev Previous value of pagination.
	 */
	protected handlePageEvent(event: PageEvent, prev: PaginationParams): void {
		this.pagination$.next(new PaginationParams({
			pageNumber: prev.pageSize === event.pageSize ?
				event.pageIndex :
				defaultParams.pagination.pageNumber,
			pageSize: event.pageSize,
		}));
	}

	/**
	 * Change sorting.
	 * @param sorting Sorting: direction and field.
	 */
	protected handleSortChange(sorting: Sort): void {
		this.sorting$.next({
			direction: sorting.direction,
			field: sorting.direction !== '' ?
				sorting.active as AnimeSortingField :
				AnimeSortingField.None,
		});
	}

	/**
	 * Track anime type.
	 * @param _index Index.
	 * @param type Anime type.
	 */
	protected trackAnimeType(_index: number, type: AnimeType): AnimeType {
		return type;
	}

	/**
	 * Track anime by id in table.
	 * @param _index Index.
	 * @param anime Anime.
	 */
	protected trackAnime(_index: number, anime: Anime): Anime['id'] {
		return anime.id;
	}

	/**
	 * Go to anime details.
	 * @param id Anime id.
	 */
	protected goToAnimeDetails(id: Anime['id']): void {
		this.router.navigate([`/anime/${id}`]);
	}

	/** Scroll to top. */
	private scrollToTopPage(): void {
		if (this.window) {
			this.window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		}
	}

	/**
	 * Create filters form.
	 * @param filters Initial filters.
	 */
	private createFiltersForm(filters: AnimeFilterParams): FormGroupOf<AnimeFilterParams> {
		return this.formBuilder.group({
			search: filters.search,
			types: [filters.types],
		});
	}

	/** Create anime list stream. */
	private createAnimeListStream(): Observable<Pagination<Anime>> {
		return combineLatest([
			this.filtersForm.valueChanges.pipe(startWith(this.filtersForm.value)),
			this.pagination$,
			this.sorting$,
		])
			.pipe(

				// Necessary to reduce the number of queries when changing table parameters frequently
				debounceTime(REQUEST_DEBOUNCE_TIME),
				map(([{ search, types }, pagination, sorting]) => this.createAnimeParams(pagination, sorting, search, types)),
				tap(params => this.setQueryParamsFromAnimeParams(params)),
				tap(() => this.isLoading$.next(true)),
				switchMap(params => this.animeService.getAnime(params).pipe(
					finalize(() => this.isLoading$.next(false)),
				)),
			);
	}

	/**
	 * Set query params from anime params.
	 * @param params Anime params.
	 */
	private setQueryParamsFromAnimeParams(params: AnimeParams): void {
		const queryParams = {
			pageSize: params.pagination.pageSize,
			pageNumber: params.pagination.pageNumber,
			field: params.sorting.field,
			direction: params.sorting.direction,
			search: params.filters.search,
			types: params.filters.types.join(','),
		};

		this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
	}

	/**
	 * Create anime params.
	 * @param pagination Pagination: pageNumber and pageSize.
	 * @param sorting Sorting: field and direction.
	 * @param search Search.
	 * @param types Anime type.
	 */
	private createAnimeParams(
		pagination: PaginationParams,
		sorting: Sorting<AnimeSortingField>,
		search: string = defaultParams.filters.search,
		types: AnimeType[] = defaultParams.filters.types,
	): AnimeParams {
		return {
			pagination,
			sorting,
			filters: new AnimeFilterParams({ search, types }),
		};
	}

	/**
	 * Map query params to anime params.
	 * @param params Query params.
	 */
	private mapQueryParamsToAnimeParams(params: QueryParamsOf<QueryAnimeParams>): AnimeParams {
		return {
			pagination: QueryParamsOfMapper.toPaginationParams(params, defaultParams.pagination),
			sorting: QueryParamsOfMapper.toSorting(params, defaultParams.sorting),
			filters: {
				search: params.search ?? defaultParams.filters.search,
				types: params.types !== undefined ?
					params.types.split(',').filter((type: string) => type.length > 0) as AnimeType[] :
					defaultParams.filters.types,
			},
		};
	}
}
