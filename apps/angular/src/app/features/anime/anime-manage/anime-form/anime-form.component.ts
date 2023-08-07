import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { GenreService } from '@js-camp/angular/core/services/genre.service';
import { StudioService } from '@js-camp/angular/core/services/studio.service';
import { AnimeType } from '@js-camp/core/models/anime/anime';
import { AnimeDetails, AnimeRating } from '@js-camp/core/models/anime/anime-details';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { AnimeSeason } from '@js-camp/core/models/anime/anime-season';
import { AnimeSource } from '@js-camp/core/models/anime/anime-source';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { Genre } from '@js-camp/core/models/anime/genre';
import { Studio } from '@js-camp/core/models/anime/studio';
import { DateRange } from '@js-camp/core/models/date-range';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Pagination } from '@js-camp/core/models/pagination';
import { enumToArray } from '@js-camp/core/utils/enum-to-array';
import { BehaviorSubject, Observable, combineLatest, finalize, first, map, shareReplay, switchMap, tap } from 'rxjs';

type FormType = 'create' | 'edit' | null;

const DEFAULT_FORM_VALUES: AnimeFormData = {
	image: null,
	trailerYoutubeId: '',
	titleEnglish: '',
	titleJapanese: '',
	type: null,
	status: null,
	airing: false,
	aired: new DateRange({ start: null, end: null }),
	description: '',
	studios: [],
	genres: [],
	rating: null,
	season: null,
	source: null,
};

/** Anime manage form. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent implements OnInit {

	/** Initial anime info. */
	@Input()
	public anime$: Observable<AnimeDetails> | null = null;

	private readonly genresUpdateTrigger$ = new BehaviorSubject<void>(undefined);

	/** Anime genres. */
	protected readonly genres$: Observable<readonly Genre[]>;

	private readonly studiosUpdateTrigger$ = new BehaviorSubject<void>(undefined);

	/** Anime studios. */
	protected readonly studios$: Observable<readonly Studio[]>;

	/** Form type. */
	@Input({ required: true })
	public type: FormType = null;

	/** Login is submitting. */
	protected readonly isSubmitting$ = new BehaviorSubject(false);

	/** Anime form. */
	protected readonly form: FormGroupOf<AnimeFormData, 'aired'>;

	/** Anime type options. */
	protected readonly types = enumToArray(AnimeType);

	/** Anime status options. */
	protected readonly statuses = enumToArray(AnimeStatus);

	/** Anime rating options. */
	protected readonly ratings = enumToArray(AnimeRating);

	/** Anime source options. */
	protected readonly sources = enumToArray(AnimeSource);

	/** Anime season options. */
	protected readonly seasons = enumToArray(AnimeSeason);

	/** Page is loading. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly animeService = inject(AnimeService);

	private readonly genreService = inject(GenreService);

	private readonly studioService = inject(StudioService);

	private readonly id = inject(ActivatedRoute).snapshot.params['id'];

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();

		this.genres$ = this.createGenresStream();
		this.studios$ = this.createStudiosStream();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		if (this.anime$ !== null) {
			this.anime$.pipe(
				tap(anime => this.form.patchValue(new AnimeFormData(anime))),
				this.untilDestroyed(),
			)
				.subscribe();
		}

		combineLatest([this.genres$, this.studios$]).pipe(
			first(),
			tap(() => this.isLoading$.next(false)),
			this.untilDestroyed(),
		)
			.subscribe();
	}

	private createGenresStream(): Observable<readonly Genre[]> {
		return this.genresUpdateTrigger$.pipe(
			switchMap(() => this.mapPaginationStreamToItemsStream(this.genreService.getGenres())),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	private createStudiosStream(): Observable<readonly Studio[]> {
		return this.studiosUpdateTrigger$.pipe(
			switchMap(() => this.mapPaginationStreamToItemsStream(this.studioService.getStudios())),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	private mapPaginationStreamToItemsStream<T>(paginationStream$: Observable<Pagination<T>>): Observable<readonly T[]> {
		return paginationStream$.pipe(map(pagination => pagination.items));
	}

	private createForm(): FormGroupOf<AnimeFormData, 'aired'> {
		return this.formBuilder.group({
			image: [DEFAULT_FORM_VALUES.image],
			trailerYoutubeId: DEFAULT_FORM_VALUES.trailerYoutubeId,
			titleEnglish: [DEFAULT_FORM_VALUES.titleEnglish, [Validators.required]],
			titleJapanese: [DEFAULT_FORM_VALUES.titleJapanese, [Validators.required]],
			type: [DEFAULT_FORM_VALUES.type, [Validators.required]],
			status: [DEFAULT_FORM_VALUES.status, [Validators.required]],
			airing: DEFAULT_FORM_VALUES.airing,
			aired: this.formBuilder.group(DEFAULT_FORM_VALUES.aired),
			description: [DEFAULT_FORM_VALUES.description, [Validators.required]],
			studios: [DEFAULT_FORM_VALUES.studios, [Validators.required]],
			genres: [DEFAULT_FORM_VALUES.genres, [Validators.required]],
			rating: [DEFAULT_FORM_VALUES.rating, [Validators.required]],
			season: [DEFAULT_FORM_VALUES.season, [Validators.required]],
			source: [DEFAULT_FORM_VALUES.source, [Validators.required]],
		});
	}

	/**
	 * Get readable status.
	 * @param status Anime status.
	 */
	protected getReadableStatus(status: AnimeStatus): string {
		return AnimeStatus.toReadable(status);
	}

	/** Submit anime form. */
	protected handleSubmit(): void {
		if (this.form.invalid || this.type === null) {
			return;
		}

		this.isSubmitting$.next(true);

		const formData = this.form.getRawValue();

		this.animeService.saveAnimeImage(formData.image).pipe(
			switchMap(imageUrl => {
				if (this.type === 'create') {
					return this.animeService.createAnime({ ...formData, image: imageUrl });
				}
				return this.animeService.editAnime(this.id, { ...formData, image: imageUrl });
			}),
			tap(anime => this.router.navigate([`/anime/${anime.id}`])),
			finalize(() => this.isSubmitting$.next(false)),
			this.untilDestroyed(),
		)
			.subscribe();
	}

	/**
	 * Add genre.
	 * @param genreName Genre's name.
	 */
	protected addGenre(genreName: string): void {
		this.genreService.createGenre(genreName).pipe(
			tap(genre => {
				this.form.controls.genres.setValue([...this.form.controls.genres.value, genre.id]);
				this.genresUpdateTrigger$.next();
			}),
			this.untilDestroyed(),
		)
			.subscribe();
	}

	/**
	 * Add studio.
	 * @param studioName Studio's name.
	 */
	protected addStudio(studioName: string): void {
		this.studioService.createStudio(studioName).pipe(
			tap(studio => {
				this.form.controls.studios.setValue([...this.form.controls.studios.value, studio.id]);
				this.studiosUpdateTrigger$.next();
			}), this.untilDestroyed(),
		)
			.subscribe();
	}
}
