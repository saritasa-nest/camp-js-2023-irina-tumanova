import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeSortField, GetAnimeParams } from '@js-camp/core/models/get-anime-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, shareReplay } from 'rxjs';

const defaultParams: GetAnimeParams = {
	limit: 10,
	page: 0,
	sorting: { field: AnimeSortField.None, direction: 'asc' },
	filters: {
		type: [],
		search: '',
	},
};

const REQUEST_DEBOUNCE_TIME = 500;

/** Anime table component. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {

	/** Columns in a table. */
	public readonly displayedColumns: readonly string[] = ['image', 'titleEnglish', 'titleJapanese', 'aired.start', 'type', 'status'];

	/** Page size options. */
	public readonly pageSizeOptions: readonly number[] = [5, 10, 20];

	/** Anime list. */
	public readonly animeList$: Observable<readonly Anime[]>;

	/** Anime is loading. */
	public readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Anime query parameters. */
	private readonly params$: Observable<GetAnimeParams>;

	/** Current table page data. */
	private readonly pagination$: Observable<Pagination<Anime>>;

	/** Current table page. */
	public readonly page$ = new BehaviorSubject<number>(defaultParams.page);

	/** Number of elements per page. */
	public limit = defaultParams.limit;

	/** Total number of anime. */
	public readonly animeTotalCount$: Observable<number>;

	/**
	 * @param animeService Anime request service.
	 */
	public constructor(private readonly animeService: AnimeService) {
		this.params$ = this.page$.pipe(
			debounceTime(REQUEST_DEBOUNCE_TIME),
			map(page => {
				const params: GetAnimeParams = {
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
		);

		this.pagination$ = this.params$.pipe(
			tap(() => this.isLoading$.next(true)),
			switchMap(params => this.animeService.getAllAnime(params)),
			tap(() => this.isLoading$.next(false)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);

		this.animeList$ = this.pagination$.pipe(
			map(({ results }) => results),
		);

		this.animeTotalCount$ = this.pagination$.pipe(
			map(({ count }) => count),
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
