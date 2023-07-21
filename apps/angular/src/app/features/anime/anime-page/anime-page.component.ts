import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { AnimeSortingField, AnimeParams, FlatAnimeParams, AnimeFilterParams } from '@js-camp/core/models/anime-params';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { Pagination } from '@js-camp/core/models/pagination';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, shareReplay, combineLatestWith, startWith, merge, first } from 'rxjs';
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
	protected readonly sorting$ = new BehaviorSubject<Sorting<AnimeSortingField>>(defaultParams.sorting);

	/** Pagination. */
	protected readonly pagination$ = new BehaviorSubject(defaultParams.pagination);

	/** Filters form: search and type filter. */
	protected readonly filtersForm = new FormGroup({
		search: new FormControl(defaultParams.filters.search, { nonNullable: true }),
		type: new FormControl(defaultParams.filters.type, { nonNullable: true }),
	});

	private readonly animeService = inject(AnimeService);

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	public constructor() {

		// If you put this subscription in ngOnInit, the filtering will break.
		// There are no ideas yet how to do it differently
		const setParamsFromQueryParams$ = this.route.queryParams.pipe(
			first(),
			map(params => this.mapQueryParamsToAnimeParams(params)),
			tap(params => this.setFiltersFromParams(params)),
			untilDestroyed(this),
		);
		setParamsFromQueryParams$.subscribe();

		const params$ = this.createParamsStream();

		this.animeList$ = params$.pipe(
			tap(() => this.isLoading$.next(true)),
			switchMap(params => this.animeService.getAnime(params)),
			tap(() => this.isLoading$.next(false)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		// TODO починить pageSize.
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

	/** Create anime list stream. */
	private createParamsStream(): Observable<AnimeParams> {
		return this.filtersForm.valueChanges.pipe(
			startWith(this.filtersForm.value),
			combineLatestWith(this.pagination$, this.sorting$),
			debounceTime(REQUEST_DEBOUNCE_TIME),
			map(([{ search, type }, pagination, { direction, field }]) =>
				this.mapOptionsToAnimeParams({
					pageNumber: pagination.pageNumber,
					pageSize: pagination.pageSize,
					direction,
					field,
					search,
					type,
				})),
			tap(params => {
				this.setQueryParamsFromAnimeParams(params);
			}),
		);
	}

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

	private mapOptionsToAnimeParams({ pageNumber, pageSize, direction, field, search, type }: Partial<FlatAnimeParams>): AnimeParams {
		return {
			pagination: new PaginationParams({
				pageNumber: pageNumber ?? defaultParams.pagination.pageNumber,
				pageSize: pageSize ?? defaultParams.pagination.pageSize,
			}),
			sorting: {
				direction: direction ?? defaultParams.sorting.direction,
				field: field ?? defaultParams.sorting.field,
			},
			filters: {
				search: search ?? defaultParams.filters.search,
				type: type ?? defaultParams.filters.type,
			},
		};
	}

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
	 * Set filters from params.
	 * @param params Params: sorting + type + search.
	 */
	private setFiltersFromParams(params: AnimeParams): void {
		this.filtersForm.setValue(params.filters);
		this.sorting$.next(params.sorting);
		this.pagination$.next(params.pagination);
	}

	/**
	 * Change paginator data.
	 * @param event Page event.
	 * @param prev Previous value of pagination.
	 */
	protected handlePageEvent(event: PageEvent, prev: PaginationParams): void {
		this.pagination$.next(new PaginationParams({
			pageNumber: prev.pageSize === event.pageSize ? event.pageIndex : 0,
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
