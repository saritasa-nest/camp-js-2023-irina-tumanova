import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { AnimeSortingField, AnimeParams } from '@js-camp/core/models/anime-params';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { Pagination } from '@js-camp/core/models/pagination';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, shareReplay, combineLatestWith, startWith, merge, Subscription, skip, first } from 'rxjs';
import { Sorting } from '@js-camp/core/models/sorting';
import { ActivatedRoute, Params, Router } from '@angular/router';

const defaultParams: AnimeParams = {
	limit: 10,
	page: 0,
	sorting: { field: AnimeSortingField.None, direction: '' },
	filters: {
		type: [],
		search: '',
	},
};

const REQUEST_DEBOUNCE_TIME = 500;

/** Anime list page. */
@Component({
	selector: 'camp-anime-page',
	templateUrl: './anime-page.component.html',
	styleUrls: ['./anime-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePageComponent implements OnDestroy, OnInit {

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
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Current table page. */
	protected readonly page$ = new BehaviorSubject<number>(defaultParams.page);

	/** Current table page. */
	protected readonly sorting$ = new BehaviorSubject<Sorting<AnimeSortingField>>(defaultParams.sorting);

	/** Number of elements per page. */
	protected limit = defaultParams.limit;

	private sideEffectsSubscription?: Subscription;

	private readonly animeService = inject(AnimeService);

	private readonly route = inject(ActivatedRoute);

	private readonly router = inject(Router);

	/** Filters form: search and type filter. */
	protected readonly filtersForm = new FormGroup({
		search: new FormControl(defaultParams.filters.search),
		type: new FormControl(defaultParams.filters.type),
	});

	public constructor() {
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
		this.sideEffectsSubscription = this.createSideEffectsSubscription();
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.sideEffectsSubscription?.unsubscribe();
	}

	private createSideEffectsSubscription(): Subscription {
		const resetPagination$ = this.filtersForm.valueChanges.pipe(
			tap(() => this.page$.next(0)),
		);

		const scrollToTopAfterChangePage$ = this.page$.pipe(
			tap(() => this.scrollToTopPage()),
		);

		return merge(
			resetPagination$,
			scrollToTopAfterChangePage$,
		).subscribe();
	}

	/** Create anime list stream. */
	private createParamsStream(): Observable<AnimeParams> {
		const paramsFromQueryParams$ = this.route.queryParams.pipe(
			map(params => this.mapQueryParamsToAnimeParams(params)),
			tap(params => this.setFiltersFromParams(params)),
			first(),
		);

		const params$ = this.filtersForm.valueChanges.pipe(
			startWith(this.filtersForm.value),
			combineLatestWith(this.page$, this.sorting$),
			debounceTime(REQUEST_DEBOUNCE_TIME),
			map(([{ search, type }, page, sorting]) => {
				const params: AnimeParams = {
					limit: this.limit,
					page,
					sorting,
					filters: {
						search: search ?? defaultParams.filters.search,
						type: type ?? defaultParams.filters.type,
					},
				};

				return params;
			}),
		);

		return merge(
			paramsFromQueryParams$,
			params$.pipe(skip(1)),
		).pipe(
			tap(params => {
				this.setQueryParamsFromAnimeParams(params);
			}),
		);
	}

	private setQueryParamsFromAnimeParams(params: AnimeParams): void {
		const queryParams = {
			limit: params.limit,
			page: params.page,
			field: params.sorting.field,
			direction: params.sorting.direction,
			search: params.filters.search,
			type: params.filters.type,
		};

		this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
	}

	private mapQueryParamsToAnimeParams(params: Params): AnimeParams {
		return {
			limit: +(params['limit'] ?? defaultParams.limit),
			page: +(params['page'] ?? defaultParams.page),
			sorting: {
				field: params['field'] as AnimeSortingField ?? defaultParams.sorting.field,
				direction: params['direction'] as SortDirection ?? defaultParams.sorting.direction,
			},
			filters: {
				type: params['type'] as AnimeType[] ?? defaultParams.filters.type,
				search: params['search'] ?? defaultParams.filters.search,
			},
		};
	}

	/**
	 * Set filters from params.
	 * @param params Params: sorting + type + search.
	 */
	private setFiltersFromParams(params: AnimeParams): void {
		this.filtersForm.setValue(params.filters, { emitEvent: false });
		this.sorting$.next(params.sorting);
		this.limit = params.limit;
		this.page$.next(params.page);
	}

	/**
	 * Change paginator data.
	 * @param event Page event.
	 */
	protected handlePageEvent(event: PageEvent): void {
		this.page$.next(this.limit === event.pageSize ? event.pageIndex : 0);
		this.limit = event.pageSize;
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
	 * Track anime type in for.
	 * @param index Index.
	 * @param type Anime type.
	 */
	protected trackType(index: number, type: AnimeType): AnimeType {
		return type;
	}

	/** Scroll to top. */
	private scrollToTopPage(): void {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}
}
