import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeSortField, AnimeParams } from '@js-camp/core/models/anime-params';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { Pagination } from '@js-camp/core/models/pagination';
import { BehaviorSubject, Observable, tap, map, debounceTime, switchMap, shareReplay } from 'rxjs';

const defaultParams: AnimeParams = {
	pageSize: 10,
	pageNumber: 0,
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
	protected readonly displayedColumns: readonly string[] = ['image', 'titleEnglish', 'titleJapanese', 'aired.start', 'type', 'status'];

	/** Page size options. */
	protected readonly pageSizeOptions: readonly number[] = [5, 10, 20];

	/** Anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	/** Anime is loading. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Current table page. */
	protected readonly pageNumber$ = new BehaviorSubject(defaultParams.pageNumber);

	/** Number of elements per page. */
	protected pageSize = defaultParams.pageSize;

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animeList$ = this.createAnimeListStream();
	}

	/** Create anime list stream. */
	private createAnimeListStream(): Observable<Pagination<Anime>> {
		return this.pageNumber$.pipe(
			debounceTime(REQUEST_DEBOUNCE_TIME),
			map(pageNumber => this.createParams(pageNumber)),
			tap(() => this.isLoading$.next(true)),
			switchMap(params => this.animeService.getAnime(params)),
			tap(() => this.isLoading$.next(false)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	/**
	 * Create query params.
	 * @param pageNumber Page number.
	 */
	private createParams(pageNumber: number): AnimeParams {
		return {
			pageSize: this.pageSize,
			pageNumber,
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
	 */
	protected handlePageEvent(event: PageEvent): void {
		this.pageNumber$.next(this.pageSize === event.pageSize ? event.pageIndex : 0);
		this.pageSize = event.pageSize;
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
