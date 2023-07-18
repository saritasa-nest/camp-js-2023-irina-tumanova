import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeQueryParams, AnimeSortDirection, AnimeSortField } from '@js-camp/core/models/anime-query-params';
import { Pagination } from '@js-camp/core/models/pagination.dto';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, shareReplay } from 'rxjs';

const defaultParams: AnimeQueryParams = {
	limit: 10,
	page: 0,
	sort: { field: AnimeSortField.None, direction: AnimeSortDirection.Asc },
	type: [],
	search: '',
};

/** Anime table component. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {

	/** Columns in a table. */
	public readonly displayedColumns = ['image', 'titleEng', 'titleJpn', 'aired.start', 'type', 'status'];

	/** Anime list. */
	public readonly animeList$: Observable<readonly Anime[]>;

	/** Anime is loading. */
	public readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Anime query parameters. */
	private readonly params$: Observable<AnimeQueryParams>;

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
	public constructor(public readonly animeService: AnimeService) {
		this.params$ = this.page$.pipe(
			debounceTime(500),
			map(page => {
				const params: AnimeQueryParams = {
					limit: this.limit,
					page,
					sort: defaultParams.sort,
					type: defaultParams.type,
					search: defaultParams.search,
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
