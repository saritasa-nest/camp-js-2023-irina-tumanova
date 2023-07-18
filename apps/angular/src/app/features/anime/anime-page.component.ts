import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime component. */
@Component({
	selector: 'camp-anime',
	templateUrl: './anime-page.component.html',
	styleUrls: ['./anime-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePageComponent {}
