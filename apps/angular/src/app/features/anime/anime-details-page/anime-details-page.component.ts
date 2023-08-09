import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, tap, switchMap, first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { YOUTUBE_EMBED_URL } from '@js-camp/core/const/const';
import { Anime } from '@js-camp/core/models/anime/anime';

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

	private readonly id$: Observable<Anime['id']>;

	private readonly animeService = inject(AnimeService);

	private readonly route = inject(ActivatedRoute);

	private readonly sanitizer = inject(DomSanitizer);

	private readonly window = inject(DOCUMENT).defaultView;

	private readonly imageModal = inject(MatDialog);

	private readonly deleteModal = inject(MatDialog);

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.id$ = this.createAnimeIdStream();
		this.details$ = this.createDetailsStream();
		this.safeTrailerUrl$ = this.createSafeTrailerUrlStream();

		this.changeTrailerComponentHeight();
	}

	private createAnimeIdStream(): Observable<number> {
		return this.route.params.pipe(map(({ id }) => Number(id)));
	}

	private createDetailsStream(): Observable<AnimeDetails> {
		return this.id$.pipe(
			switchMap(id => this.animeService.getAnimeDetails(id)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	private createSafeTrailerUrlStream(): Observable<SafeResourceUrl | null> {
		return this.details$.pipe(map(details => this.createSafeYoutubeUrl(details.trailerYoutubeId)));
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.details$.pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse && error.status === 404) {
					this.navigateToMainPage();
				}
				return of(error);
			}),
			this.untilDestroyed(),
		).subscribe();
	}

	private createSafeYoutubeUrl(trailerYoutubeId: string | null): SafeResourceUrl | null {
		return trailerYoutubeId !== null ?
			this.sanitizer.bypassSecurityTrustResourceUrl(`${YOUTUBE_EMBED_URL}${trailerYoutubeId}`) :
			null;
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

	/** Go to anime editing. */
	protected navigateToAnimeEditing(): void {
		this.id$.pipe(
			first(),
			tap(id => this.router.navigate([`/anime/${id}/edit`])),
			this.untilDestroyed(),
		)
			.subscribe();
	}

	/** Handle delete button click. */
	protected openDeleteModal(): void {
		this.deleteModal.open(DeleteModalComponent, {
			data: {
				delete: () => this.deleteAnime(),
				name: 'anime',
				cancel: () => this.deleteModal.closeAll(),
			},
		});
	}

	/** Handle confirm button click. */
	protected deleteAnime(): void {
		this.id$.pipe(
			first(),
			switchMap(id => this.animeService.deleteAnime(id)),
			tap(() => this.deleteModal.closeAll()),
			tap(() => this.navigateToMainPage()),
			this.untilDestroyed(),
		)
			.subscribe();
	}

	private navigateToMainPage(): void {
		this.router.navigate(['']);
	}
}
