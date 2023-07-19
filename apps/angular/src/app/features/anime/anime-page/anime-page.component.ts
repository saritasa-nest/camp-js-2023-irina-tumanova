import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeSortField, AnimeParams } from '@js-camp/core/models/anime-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, shareReplay } from 'rxjs';

const defaultParams: AnimeParams = {
	limit: 10,
	page: 0,
	sorting: { field: AnimeSortField.None, direction: 'asc' },
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
	public readonly displayedColumns: readonly string[] = ['image', 'titleEnglish', 'titleJapanese', 'aired.start', 'type', 'status'];

	/** Page size options. */
	public readonly pageSizeOptions: readonly number[] = [5, 10, 20];

	/** Anime list. */
	public readonly animeList$: Observable<Pagination<Anime>>;

	/** Anime is loading. */
	public readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Current table page. */
	public readonly page$ = new BehaviorSubject<number>(defaultParams.page);

	/** Number of elements per page. */
	public limit = defaultParams.limit;

	private readonly animeService = inject(AnimeService);

	/**
	 * @param animeService Anime request service.
	 */
	public constructor() {
		this.animeList$ = this.createAnimeListStream();
	}

	/** Create anime list stream. */
	private createAnimeListStream(): Observable<Pagination<Anime>> {
		return this.page$.pipe(
			debounceTime(REQUEST_DEBOUNCE_TIME),
			map(page => {
				const params: AnimeParams = {
					limit: this.limit,
					page,
					sorting: defaultParams.sorting,
					filters: {
						type: defaultParams.filters.type,
						search: defaultParams.filters.search,
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
	public handlePageEvent(event: PageEvent): void {
		this.page$.next(this.limit === event.pageSize ? event.pageIndex : 0);
		this.limit = event.pageSize;
	}
}
