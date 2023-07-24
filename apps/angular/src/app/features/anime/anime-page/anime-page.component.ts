import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeSortField, AnimeParams, AnimeFilterParams } from '@js-camp/core/models/anime-params';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap } from 'rxjs';

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 10, pageNumber: 0 }),
	sorting: new Sorting({ field: AnimeSortField.None, direction: 'asc' }),
	filters: new AnimeFilterParams({ type: [], search: '' }),
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

	/** Anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Anime is loading. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Pagination. */
	protected readonly pagination$ = new BehaviorSubject(defaultParams.pagination);

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animeList$ = this.createAnimeListStream();
	}

	/** Create anime list stream. */
	private createAnimeListStream(): Observable<Pagination<Anime>> {
		return this.pagination$.pipe(
			debounceTime(REQUEST_DEBOUNCE_TIME),
			map(pagination => this.createParams(pagination)),
			tap(() => this.isLoading$.next(true)),
			switchMap(params => this.animeService.getAnime(params)),
			tap(() => this.isLoading$.next(false)),
		);
	}

	/**
	 * Create query params.
	 * @param pagination Pagination.
	 */
	private createParams(pagination: PaginationParams): AnimeParams {
		return {
			pagination,
			sorting: defaultParams.sorting,
			filters: {
				type: defaultParams.filters.type,
				search: defaultParams.filters.search,
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
	 * Get readable status.
	 * @param status Anime status.
	 */
	protected getReadableStatus(status: AnimeStatus): string {
		return AnimeStatus.toReadable(status);
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
