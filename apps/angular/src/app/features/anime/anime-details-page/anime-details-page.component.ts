import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { BehaviorSubject, Observable, fromEvent, map, shareReplay, tap } from 'rxjs';
import { AnimeSource } from '@js-camp/core/models/anime/anime-source';
import { AnimeSeason } from '@js-camp/core/models/anime/anime-season';

import { ImageModalComponent } from '../components/image-modal/image-modal.component';
import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';

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

	/** Is open delete modal. */
	protected readonly isOpenDeleteModal$ = new BehaviorSubject(false);

	/** Anime trailer component height. */
	protected readonly trailerComponentHeight$ = new BehaviorSubject<number | null>(null);

	private readonly id: string;

	private readonly animeService = inject(AnimeService);

	private readonly route = inject(ActivatedRoute);

	private readonly sanitizer = inject(DomSanitizer);

	private readonly window = inject(DOCUMENT).defaultView;

	private readonly imageModal = inject(MatDialog);

	private readonly deleteModal = inject(MatDialog);

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.id = this.route.snapshot.params['id'] as string;
		this.details$ = this.animeService.getAnimeDetails(this.id).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
		this.safeTrailerUrl$ = this.details$.pipe(
			map(details => details.trailerYoutubeUrl !== null ?
				this.sanitizer.bypassSecurityTrustResourceUrl(details.trailerYoutubeUrl) :
				null),
		);

		this.changeTrailerComponentHeight();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		fromEvent(this.window ?? window, 'resize')
			.pipe(
				tap(() => this.changeTrailerComponentHeight()),
				this.untilDestroyed(),
			)
			.subscribe();
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

	/**
	 * Go to anime editing.
	 * @param id Anime id.
	 */
	protected goToAnimeEditing(): void {
		this.router.navigate([`/anime/${this.id}/edit`]);
	}

	/** Handle delete button click. */
	protected openDeleteModal(): void {
		this.deleteModal.open(DeleteModalComponent, { data: { delete: this.deleteAnime, name: 'anime' } });
	}

	/** Handle confirm button click. */
	protected deleteAnime(): void {
		this.animeService.deleteAnime(this.id).pipe(
			tap(() => this.router.navigate([])),
			this.untilDestroyed(),
		)
			.subscribe();
	}

	/**
	 * Get readable source.
	 * @param source Anime source.
	 */
	protected getReadableSource(source: AnimeSource): string {
		return AnimeSource.toReadable(source);
	}

	/**
	 * Get readable season.
	 * @param season Anime season.
	 */
	protected getReadableSeason(season: AnimeSeason): string {
		return AnimeSeason.toReadable(season);
	}
}
