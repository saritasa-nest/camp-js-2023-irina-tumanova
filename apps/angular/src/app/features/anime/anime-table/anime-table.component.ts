import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime-service.service';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeQueryParams, AnimeSort, AnimeSortField } from '@js-camp/core/models/anime-query-params';
import { Pagination } from '@js-camp/core/models/pagination.dto';
import { BehaviorSubject, Observable, tap, map, combineLatestWith, debounceTime, switchMap, shareReplay } from 'rxjs';

const defaultParams: AnimeQueryParams = {
	limit: 10,
	page: 0,
	sort: { field: AnimeSortField.None, direction: '' },
	type: [],
	search: '',
};

@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {

	public readonly displayedColumns = ['image', 'titleEng', 'titleJpn', 'aired.start', 'type', 'status'];

	public readonly animeList$: Observable<readonly Anime[]>;

	public readonly isLoading$ = new BehaviorSubject<boolean>(false);

	public readonly params$: Observable<AnimeQueryParams>;

	public readonly currentPage$ = new BehaviorSubject<number>(defaultParams.page);

	public readonly pageSize$ = new BehaviorSubject<number>(defaultParams.limit);

	public currentPageSize = defaultParams.limit;

	public readonly sort$ = new BehaviorSubject<AnimeSort>(defaultParams.sort);

	public readonly currentPagination$: Observable<Pagination<Anime>>;

	public readonly count$: Observable<number>;

	// @ViewChild(MatPaginator) public paginator: MatPaginator;

	public constructor(public readonly animeService: AnimeService) {
		this.params$ = this.currentPage$.pipe(
			combineLatestWith(
				this.sort$,
				this.pageSize$,
			),
			debounceTime(500),
			map(([page, sort, pageSize]) => {
				const params: AnimeQueryParams = {
					limit: pageSize,
					page,
					sort,
					type: defaultParams.type,
					search: defaultParams.search,
				};

				return params;
			}),
		);

		this.currentPagination$ = this.params$.pipe(
			tap(() => this.isLoading$.next(true)),
			switchMap(params => this.animeService.getAllAnime(params)),
			tap(() => this.isLoading$.next(false)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);

		this.animeList$ = this.currentPagination$.pipe(
			map(({ results }) => results),
		);

		this.count$ = this.currentPagination$.pipe(
			map(({ count }) => count),
		);
	}

	public handlePageEvent(event: PageEvent) {
		this.currentPage$.next(this.currentPageSize === event.pageSize ? event.pageIndex : 0);
		this.pageSize$.next(event.pageSize);

		this.currentPageSize = event.pageSize;

		/* this.length = event.length;
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;*/
	  }
}
