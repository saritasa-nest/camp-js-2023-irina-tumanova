import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { BehaviorSubject, Observable, fromEvent, map, tap } from 'rxjs';

const TRAILER_COMPONENT_ASPECT_RATION = 9 / 16;

/** Anime details page. */
@Component({
	selector: 'camp-anime-details-page',
	templateUrl: './anime-details-page.component.html',
	styleUrls: ['./anime-details-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsPageComponent implements OnInit {

	/** Anime details. */
	protected readonly details$: Observable<AnimeDetails>;

	/** Safe trailer url. */
	protected readonly safeTrailerUrl$: Observable<SafeResourceUrl | null>;

	/** Anime trailer component height. */
	protected readonly trailerComponentHeight$ = new BehaviorSubject<number | null>(null);

	private readonly animeService = inject(AnimeService);

	private readonly route = inject(ActivatedRoute);

	private readonly sanitizer = inject(DomSanitizer);

	private readonly window = inject(DOCUMENT).defaultView;

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		const animeId = this.route.snapshot.params['id'] as string;
		this.details$ = this.animeService.getAnimeDetails(animeId);
		this.safeTrailerUrl$ = this.details$.pipe(
			map(details => {
				if (details.trailerYoutubeUrl === null) {
					return null;
				}
				return this.sanitizer.bypassSecurityTrustResourceUrl(details.trailerYoutubeUrl);
			}),
		);

		this.changeTrailerComponentHeight();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		fromEvent(this.window ?? window, 'resize')
			.pipe(
				tap(() => this.changeTrailerComponentHeight()),
				this.untilDestroyed(),

				// debounceTime(200),
			)
			.subscribe();
	}

	/** Handle page resize. */
	public changeTrailerComponentHeight(): void {
		if (this.window === null) {
			return;
		}
		this.trailerComponentHeight$.next(this.window.innerWidth * TRAILER_COMPONENT_ASPECT_RATION);
	}

	/**
	 * Get readable status.
	 * @param status Anime status.
	 */
	protected getReadableStatus(status: AnimeStatus): string {
		return AnimeStatus.toReadable(status);
	}

	/**
	 * Get readable airing.
	 * @param airing Anime airing.
	 */
	protected getReadableAiring(airing: boolean): string {
		return airing ? 'Yes' : 'No';
	}
}
