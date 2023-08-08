import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { BehaviorSubject, Observable, map, shareReplay, switchMap } from 'rxjs';

import { ImageModalComponent } from '../components/image-modal/image-modal.component';

const TRAILER_COMPONENT_ASPECT_RATION = 9 / 16;

/** Anime details page. */
@Component({
	selector: 'camp-anime-details-page',
	templateUrl: './anime-details-page.component.html',
	styleUrls: ['./anime-details-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsPageComponent {

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

	private readonly imageModal = inject(MatDialog);

	public constructor() {
		this.details$ = this.createDetailsStream();
		this.safeTrailerUrl$ = this.createSafeTrailerUrlStream();

		this.changeTrailerComponentHeight();
	}

	private createDetailsStream(): Observable<AnimeDetails> {
		return this.route.params.pipe(
			map(({ id }) => Number(id)),
			switchMap(id => this.animeService.getAnimeDetails(id)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	private createSafeTrailerUrlStream(): Observable<SafeResourceUrl | null> {
		return this.details$.pipe(
			map(details => details.trailerYoutubeUrl !== null ?
				this.sanitizer.bypassSecurityTrustResourceUrl(details.trailerYoutubeUrl) :
				null),
		);
	}

	/**
	 * Open image modal.
	 * @param imageUrl Anime image url.
	 * @param title Anime english title.
	 */
	protected openImageModal(imageUrl: string, title: string): void {
		this.imageModal.open(ImageModalComponent, { data: { title, imageUrl } });
	}

	/** Handle page resize. */
	protected changeTrailerComponentHeight(): void {
		if (this.window === null) {
			return;
		}
		this.trailerComponentHeight$.next(this.window.innerWidth * TRAILER_COMPONENT_ASPECT_RATION);
	}

	/**
	 * Get readable airing.
	 * @param airing Anime airing.
	 */
	protected getReadableAiring(airing: boolean): string {
		return airing ? 'Yes' : 'No';
	}
}
