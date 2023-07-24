import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { AnimeSortingField, AnimeParams, AnimeFilterParams } from '@js-camp/core/models/anime-params';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { Pagination } from '@js-camp/core/models/pagination';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, combineLatestWith, startWith, merge } from 'rxjs';
import { Sorting } from '@js-camp/core/models/sorting';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 10, pageNumber: 0 }),
	sorting: new Sorting({ field: AnimeSortingField.None, direction: 'asc' }),
	filters: new AnimeFilterParams({ type: [], search: '' }),
};

const REQUEST_DEBOUNCE_TIME = 500;

type FiltersForm = FormGroup<{search: FormControl<string>; type: FormControl<AnimeType[]>;}>;

/** Anime list page. */
@UntilDestroy()
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
	protected readonly animeTypes: readonly AnimeType[] = [
		AnimeType.Movie,
		AnimeType.Music,
		AnimeType.ONA,
		AnimeType.OVA,
		AnimeType.Special,
		AnimeType.TV,
		AnimeType.Unknown,
	];

	/** Anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Anime is loading. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Current table page. */
	protected readonly sorting$: BehaviorSubject<Sorting<AnimeSortingField>>;

	/** Pagination. */
	protected readonly pagination$: BehaviorSubject<PaginationParams>;

	/** Filters form: search and type filter. */
	protected readonly filtersForm: FiltersForm;

	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

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
			tap(() => this.pagination$.next({ pageNumber: 0, pageSize: defaultParams.pagination.pageSize })),
		);

		const scrollToTopAfterChangePageSideEffect$ = this.pagination$.pipe(
			tap(() => this.scrollToTopPage()),
		);

		merge(resetPaginationSideEffect$, scrollToTopAfterChangePageSideEffect$)
			.pipe(untilDestroyed(this))
			.subscribe();
	}

	/**
	 * Create filters form.
	 * @param filters Initial filters.
	 */
	private createFiltersForm(filters: AnimeFilterParams): FiltersForm {
		return this.formBuilder.group({
			search: this.formBuilder.control(filters.search),
			type: this.formBuilder.control(filters.type),
		});
	}

	/** Create anime list stream. */
	private createAnimeListStream(): Observable<Pagination<Anime>> {
		return this.filtersForm.valueChanges.pipe(
			startWith(this.filtersForm.value),
			combineLatestWith(this.pagination$, this.sorting$),
			debounceTime(REQUEST_DEBOUNCE_TIME),
			map(([{ search, type }, pagination, sorting]) => this.createParams(pagination, sorting, search, type)),
			tap(params => this.setQueryParamsFromAnimeParams(params)),
			tap(() => this.isLoading$.next(true)),
			switchMap(params => this.animeService.getAnime(params)),
			tap(() => this.isLoading$.next(false)),
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
	private createParams(pagination: PaginationParams, sorting: Sorting<AnimeSortingField>,
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
	private mapQueryParamsToAnimeParams(params: Params): AnimeParams {
		return {
			pagination: new PaginationParams({
				pageSize: +(params['pageSize'] ?? defaultParams.pagination.pageSize),
				pageNumber: +(params['pageNumber'] ?? defaultParams.pagination.pageNumber),
			}),
			sorting: {
				direction: params['direction'] as SortDirection ?? defaultParams.sorting.direction,
				field: params['field'] as AnimeSortingField ?? defaultParams.sorting.field,
			},
			filters: {
				search: params['search'] ?? defaultParams.filters.search,
				type: params['type'] !== undefined ?
					params['type'].split(',').filter((type: string) => type.length > 0) as AnimeType[] :
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
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
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
