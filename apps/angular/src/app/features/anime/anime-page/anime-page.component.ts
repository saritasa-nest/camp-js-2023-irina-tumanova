import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime, AnimeType } from '@js-camp/core/models/anime';
import { AnimeSortingField, AnimeParams } from '@js-camp/core/models/anime-params';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { Pagination } from '@js-camp/core/models/pagination';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, shareReplay, combineLatestWith, startWith } from 'rxjs';
import { Sorting } from '@js-camp/core/models/sorting';

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
export class AnimePageComponent {

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
	private readonly sorting$ = new BehaviorSubject<Sorting<AnimeSortingField>>(defaultParams.sorting);

	/** Number of elements per page. */
	protected limit = defaultParams.limit;

	private readonly animeService = inject(AnimeService);

	/** Filters form: search and type filter. */
	protected readonly filtersForm = new FormGroup({
		search: new FormControl(defaultParams.filters.search),
		type: new FormControl(defaultParams.filters.type),
	});

	/**
	 * @param animeService Anime request service.
	 */
	public constructor() {
		this.animeList$ = this.createAnimeListStream();
	}

	/** Create anime list stream. */
	private createAnimeListStream(): Observable<Pagination<Anime>> {
		return this.page$.pipe(
			combineLatestWith(
				this.filtersForm.valueChanges.pipe(
					tap(() => this.page$.next(0)),
					startWith(this.filtersForm.value),
				),
				this.sorting$,
			),
			debounceTime(REQUEST_DEBOUNCE_TIME),
			map(([page, { search, type }, sorting]) => {
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
			tap(() => this.isLoading$.next(true)),
			switchMap(params => this.animeService.getAnime(params)),
			tap(() => this.isLoading$.next(false)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
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
		this.sorting$.next({ direction: sorting.direction, field: sorting.active as AnimeSortingField });
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
}
