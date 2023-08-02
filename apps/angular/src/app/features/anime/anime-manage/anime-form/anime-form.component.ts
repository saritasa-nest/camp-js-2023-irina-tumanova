import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AnimeType } from '@js-camp/core/models/anime/anime';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { DateRange } from '@js-camp/core/models/date-range';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { enumToArray } from '@js-camp/core/utils/enum-to-array';
import { Observable, tap } from 'rxjs';

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

	/** Form type. */
	@Input({ required: true })
	public type: FormType = null;

	/** Anime form. */
	protected readonly form: FormGroupOf<AnimeFormData, 'aired'>;

	/** Anime type options. */
	protected readonly types = enumToArray(AnimeType);

	/** Anime status options. */
	protected readonly statuses = enumToArray(AnimeStatus);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();
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
			imageUrl: [DEFAULT_FORM_VALUES.imageUrl, [Validators.required]],
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
}
