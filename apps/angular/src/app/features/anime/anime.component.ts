import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime component. */
@Component({
	selector: 'camp-anime',
	templateUrl: './anime.component.html',
	styleUrls: ['./anime.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent {}
