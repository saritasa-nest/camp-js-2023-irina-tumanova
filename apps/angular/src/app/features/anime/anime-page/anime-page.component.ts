import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { AnimeSortingField, AnimeParams, AnimeFilterParams, QueryAnimeParams } from '@js-camp/core/models/anime-params';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { Pagination } from '@js-camp/core/models/pagination';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, startWith, merge, combineLatest, finalize, withLatestFrom } from 'rxjs';
import { Sorting } from '@js-camp/core/models/sorting';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { enumToArray } from '@js-camp/core/utils/enum-to-array';
import { untilDestroyed } from '@js-camp/angular/shared/pipes/until-destroyed';
import { QueryParamsOf } from '@js-camp/core/models/query-params-of';

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 10, pageNumber: 0 }),
	sorting: new Sorting({ field: AnimeSortingField.None, direction: 'asc' }),
	filters: new AnimeFilterParams({ type: [], search: '' }),
};

const REQUEST_DEBOUNCE_TIME = 500;

type FiltersForm = FormGroup<{search: FormControl<string>; type: FormControl<AnimeType[]>;}>;

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
	protected readonly filtersForm: FiltersForm;

	private readonly untilDestroyed = untilDestroyed();

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	@Inject(DOCUMENT) private window = inject(DOCUMENT).defaultView;

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
	 * Create filters form.
	 * @param filters Initial filters.
	 */
	private createFiltersForm(filters: AnimeFilterParams): FiltersForm {
		return this.formBuilder.group({
			search: filters.search,
			type: [filters.type],
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
				debounceTime(REQUEST_DEBOUNCE_TIME),
				map(([{ search, type }, pagination, sorting]) => this.createAnimeParams(pagination, sorting, search, type)),
				tap(params => this.setQueryParamsFromAnimeParams(params)),
				tap(() => this.isLoading$.next(true)),
				switchMap(params => this.animeService.getAnime(params)),
				tap(() => this.isLoading$.next(false)),
				finalize(() => this.isLoading$.next(false)),
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
			type: params.filters.type.join(','),
		};

		this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
	}

	/**
	 * Create anime params.
	 * @param pagination Pagination: pageNumber and pageSize.
	 * @param sorting Sorting: field and direction.
	 * @param search Search.
	 * @param type Anime type.
	 */
	private createAnimeParams(pagination: PaginationParams, sorting: Sorting<AnimeSortingField>,
		search?: string, type?: AnimeType[]): AnimeParams {
		return {
			pagination,
			sorting,
			filters: {
				search: search ?? defaultParams.filters.search,
				type: type ?? defaultParams.filters.type,
			},
		};
	}

	/**
	 * Map query params to anime params.
	 * @param params Query params.
	 */
	private mapQueryParamsToAnimeParams(params: QueryParamsOf<QueryAnimeParams>): AnimeParams {
		return {
			pagination: new PaginationParams({
				pageSize: params.pageSize !== undefined ?
					Number.parseInt(params.pageSize, 10) :
					defaultParams.pagination.pageSize,
				pageNumber: params.pageNumber !== undefined ?
					Number.parseInt(params.pageNumber, 10) :
					defaultParams.pagination.pageNumber,
			}),
			sorting: {
				direction: params.direction as SortDirection ?? defaultParams.sorting.direction,
				field: params.field as AnimeSortingField ?? defaultParams.sorting.field,
			},
			filters: {
				search: params.search ?? defaultParams.filters.search,
				type: params.type !== undefined ?
					params.type.split(',').filter((type: string) => type.length > 0) as AnimeType[] :
					defaultParams.filters.type,
			},
		};
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
	 * Get readable status.
	 * @param status Anime status.
	 */
	protected getReadableStatus(status: AnimeStatus): string {
		return AnimeStatus.toReadable(status);
	}

	/**
	 * Track anime type.
	 * @param index Index.
	 * @param type Anime type.
	 */
	protected trackAnimeType(index: number, type: AnimeType): AnimeType {
		return type;
	}

	/** Scroll to top. */
	private scrollToTopPage(): void {
		if (this.window) {
			this.window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		}
	}

	/**
	 * Track anime by id in table.
	 * @param index Index.
	 * @param anime Anime.
	 */
	protected trackById(index: number, anime: Anime): number {
		return anime.id;
	}
}
