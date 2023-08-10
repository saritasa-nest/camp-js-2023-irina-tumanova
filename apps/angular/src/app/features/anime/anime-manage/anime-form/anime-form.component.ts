import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
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
import { DefaultListParams } from '@js-camp/core/models/list-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { enumToArray } from '@js-camp/core/utils/enum-to-array';
import { BehaviorSubject, Observable, finalize, switchMap, tap } from 'rxjs';

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
export class AnimeFormComponent {

	/** Initial anime info. */
	@Input()
	public set anime(anime: AnimeDetails | null) {
		if (anime !== null) {
			this.setFormValues(anime);
		}
	}

	/** Form type. */
	@Input({ required: true })
	public type: FormType = null;

	/** Form. */
	protected readonly form: FormGroupOf<AnimeFormData, 'aired'>;

	/** Form is submitting. */
	protected readonly isSubmitting$ = new BehaviorSubject(false);

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

	/** Genre service. */
	protected readonly genreService = inject(GenreService);

	/** Studio service. */
	protected readonly studioService = inject(StudioService);

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();
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
			studios: [DEFAULT_FORM_VALUES.studios, [Validators.required]],
			genres: [DEFAULT_FORM_VALUES.genres, [Validators.required]],
			rating: [DEFAULT_FORM_VALUES.rating, [Validators.required]],
			season: [DEFAULT_FORM_VALUES.season, [Validators.required]],
			source: [DEFAULT_FORM_VALUES.source, [Validators.required]],
		});
		form.controls.imageFile.setValidators(AppValidators.requiredImageUrl(form.controls.imageUrl));

		return form;
	}

	private setFormValues(anime: AnimeDetails): void {
		this.form.patchValue(new AnimeFormData({
			...anime,
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
	 * Track by index.
	 * @param index Item index.
	 */
	protected trackByIndex(index: number): number {
		return index;
	}

	/**
	 * Get genres.
	 * @param params List params.
	 */
	protected getGenres = (params: DefaultListParams<undefined>): Observable<Pagination<Genre>> => this.genreService.getGenres(params);

	/**
	 * Create genre.
	 * @param name Genre name.
	 */
	protected createGenre = (name: string): Observable<Genre> => this.genreService.createGenre(name);

	/**
	 * Check genres are equal.
	 * @param first Genre.
	 * @param second Genre.
	 */
	protected checkGenresAreEqual = (first: Genre, second: Genre): boolean => first.id === second.id;

	/**
	 * Get studios.
	 * @param params List params.
	 */
	protected getStudios = (params: DefaultListParams<undefined>): Observable<Pagination<Studio>> => this.studioService.getStudios(params);

	/**
	 * Create studio.
	 * @param name Studio name.
	 */
	protected createStudio = (name: string): Observable<Studio> => this.studioService.createStudio(name);

	/**
	 * Check studios are equal.
	 * @param first Studio.
	 * @param second Studio.
	 */
	protected checkStudiosAreEqual = (first: Studio, second: Studio): boolean => first.id === second.id;
}
