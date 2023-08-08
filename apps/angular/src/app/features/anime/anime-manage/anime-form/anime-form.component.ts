import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { GenreService } from '@js-camp/angular/core/services/genre.service';
import { StudioService } from '@js-camp/angular/core/services/studio.service';
import { AppValidators } from '@js-camp/angular/core/utils/validators';
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
	imageUrl: null,
	imageFile: null,
	trailerYoutubeId: null,
	titleEnglish: '',
	titleJapanese: '',
	type: null,
	status: null,
	airing: false,
	aired: new DateRange({ start: null, end: null }),
	description: '',
	studiosIds: [],
	genresIds: [],
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

	/** Form type. */
	@Input({ required: true })
	public type: FormType = null;

	/** Form. */
	protected readonly form: FormGroupOf<AnimeFormData, 'aired'>;

	/** Form is loading. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	/** Form is submitting. */
	protected readonly isSubmitting$ = new BehaviorSubject(false);

	/** Genres. */
	protected readonly genres$: Observable<readonly Genre[]>;

	private readonly genresUpdateTrigger$ = new BehaviorSubject<void>(undefined);

	/** Studios. */
	protected readonly studios$: Observable<readonly Studio[]>;

	private readonly studiosUpdateTrigger$ = new BehaviorSubject<void>(undefined);

	/** Types. */
	protected readonly types = enumToArray(AnimeType);

	/** Statuses. */
	protected readonly statuses = enumToArray(AnimeStatus);

	/** Ratings. */
	protected readonly ratings = enumToArray(AnimeRating);

	/** Sourses. */
	protected readonly sources = enumToArray(AnimeSource);

	/** Seasons. */
	protected readonly seasons = enumToArray(AnimeSeason);

	private readonly id = inject(ActivatedRoute).snapshot.params['id'];

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly animeService = inject(AnimeService);

	private readonly genreService = inject(GenreService);

	private readonly studioService = inject(StudioService);

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();

		this.genres$ = this.createGenresStream();
		this.studios$ = this.createStudiosStream();
	}

	private createForm(): FormGroupOf<AnimeFormData, 'aired'> {
		const form = this.formBuilder.group({
			imageUrl: [DEFAULT_FORM_VALUES.imageUrl],
			imageFile: [DEFAULT_FORM_VALUES.imageFile],
			trailerYoutubeId: DEFAULT_FORM_VALUES.trailerYoutubeId,
			titleEnglish: [DEFAULT_FORM_VALUES.titleEnglish, [Validators.required]],
			titleJapanese: [DEFAULT_FORM_VALUES.titleJapanese, [Validators.required]],
			type: [DEFAULT_FORM_VALUES.type, [Validators.required]],
			status: [DEFAULT_FORM_VALUES.status, [Validators.required]],
			airing: DEFAULT_FORM_VALUES.airing,
			aired: this.formBuilder.group(DEFAULT_FORM_VALUES.aired),
			description: [DEFAULT_FORM_VALUES.description, [Validators.required]],
			studiosIds: [DEFAULT_FORM_VALUES.studiosIds, [Validators.required]],
			genresIds: [DEFAULT_FORM_VALUES.genresIds, [Validators.required]],
			rating: [DEFAULT_FORM_VALUES.rating, [Validators.required]],
			season: [DEFAULT_FORM_VALUES.season, [Validators.required]],
			source: [DEFAULT_FORM_VALUES.source, [Validators.required]],
		});
		form.controls.imageFile.setValidators(AppValidators.requiredImageUrl(form.controls.imageUrl));

		return form;
	}

	private createGenresStream(): Observable<readonly Genre[]> {
		return this.genresUpdateTrigger$.pipe(
			switchMap(() => this.mapPaginationStreamToItemsStreamWithShareReplay(this.genreService.getGenres())),
		);
	}

	private createStudiosStream(): Observable<readonly Studio[]> {
		return this.studiosUpdateTrigger$.pipe(
			switchMap(() => this.mapPaginationStreamToItemsStreamWithShareReplay(this.studioService.getStudios())),
		);
	}

	private mapPaginationStreamToItemsStreamWithShareReplay<T>(paginationStream$: Observable<Pagination<T>>): Observable<readonly T[]> {
		return paginationStream$.pipe(
			map(pagination => pagination.items),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		if (this.anime$ !== null) {
			this.anime$.pipe(
				tap(anime => this.setFormValueFromInputAnime(anime)),
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

	private setFormValueFromInputAnime(anime: AnimeDetails): void {
		this.form.patchValue(new AnimeFormData({
			...anime,
			genresIds: anime.genres.map(genre => genre.id),
			studiosIds: anime.studios.map(genre => genre.id),
			imageUrl: anime.imageUrl,
			imageFile: null,
		}));
	}

	/** Submit anime form. */
	protected handleSubmit(): void {
		if (this.form.invalid || this.type === null) {
			return;
		}

		this.isSubmitting$.next(true);

		const formData = this.form.getRawValue();

		this.animeService.saveAnimeImage(formData.imageFile).pipe(
			switchMap(imageUrl => this.submitAnime(formData, imageUrl ?? formData.imageUrl)),
			tap(anime => this.router.navigate([`/anime/${anime.id}`])),
			finalize(() => this.isSubmitting$.next(false)),
			this.untilDestroyed(),
		)
			.subscribe();
	}

	private submitAnime(formData: AnimeFormData, imageUrl: string | null): Observable<AnimeDetails> {
		if (this.type === 'create') {
			return this.animeService.createAnime({ ...formData, imageUrl });
		}
		return this.animeService.editAnime(this.id, { ...formData, imageUrl });
	}

	/**
	 * Add genre.
	 * @param genreName Genre's name.
	 */
	protected addGenre(genreName: string): void {
		this.genreService.createGenre(genreName).pipe(
			tap(genre => {
				this.form.controls.genresIds.setValue([...this.form.controls.genresIds.value, genre.id]);
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
				this.form.controls.studiosIds.setValue([...this.form.controls.studiosIds.value, studio.id]);
				this.studiosUpdateTrigger$.next();
			}), this.untilDestroyed(),
		)
			.subscribe();
	}

	/**
	 * Track by index.
	 * @param index Item index.
	 */
	protected trackByIndex(index: number): number {
		return index;
	}
}
