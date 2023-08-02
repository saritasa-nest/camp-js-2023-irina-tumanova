import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { Observable, switchMap } from 'rxjs';

/** Anime edit page. */
@Component({
	selector: 'camp-anime-edit-page',
	templateUrl: './anime-edit-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditPageComponent {

	/** Initial anime info. */
	protected readonly anime$: Observable<AnimeDetails>;

	private readonly animeService = inject(AnimeService);

	private readonly route = inject(ActivatedRoute);

	public constructor() {
		this.anime$ = this.route.params.pipe(
			switchMap(params => this.animeService.getAnimeDetails(params['id'])),
		);
	}
}
