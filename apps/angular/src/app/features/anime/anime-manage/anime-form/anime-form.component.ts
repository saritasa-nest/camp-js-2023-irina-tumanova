import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeType } from '@js-camp/core/models/anime/anime';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { Genre } from '@js-camp/core/models/anime/genre';
import { Studio } from '@js-camp/core/models/anime/studio';
import { DateRange } from '@js-camp/core/models/date-range';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Pagination } from '@js-camp/core/models/pagination';
import { enumToArray } from '@js-camp/core/utils/enum-to-array';
import { BehaviorSubject, Observable, finalize, first, map, tap } from 'rxjs';

type FormType = 'create' | 'edit' | null;

const DEFAULT_FORM_VALUES: AnimeFormData = {
	imageUrl: null,
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

	/** Anime genres. */
	protected readonly genres$: Observable<readonly Genre[]>;

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

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly animeService = inject(AnimeService);

	private readonly id = inject(ActivatedRoute).snapshot.params['id'];

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();
		this.genres$ = this.animeService.getGenres().pipe(map(pagination => pagination.items));
		this.studios$ = this.animeService.getStudios().pipe(map(pagination => pagination.items));
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
	}

	private createForm(): FormGroupOf<AnimeFormData, 'aired'> {
		return this.formBuilder.group({
			imageUrl: [DEFAULT_FORM_VALUES.imageUrl],
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

		const submitObservable$ = this.type === 'edit' ?
			this.animeService.editAnime(this.id, this.form.getRawValue()) :
			this.animeService.createAnime(this.form.getRawValue());

		submitObservable$.pipe(
			first(),
			tap(anime => this.router.navigate([`/anime/${anime.id}`])),
			finalize(() => this.isSubmitting$.next(false)),
		)
			.subscribe();
	}
}
