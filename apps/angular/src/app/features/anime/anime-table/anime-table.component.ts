import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime-service.service';
import { Anime } from '@js-camp/core/models/anime';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	public readonly displayedColumns = ['image', 'titleEng', 'titleJpn', 'aired.start', 'type', 'status'];

	public readonly animeList$: Observable<readonly Anime[]>;

	public readonly isLoading$ = new BehaviorSubject<boolean>(true);

	public constructor(public readonly animeService: AnimeService) {
		this.animeList$ = animeService.getAllAnime().pipe(
			tap(() => this.isLoading$.next(true)),
			map(({ results }) => results),
		);
	}
}
