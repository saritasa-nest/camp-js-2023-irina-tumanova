import { Pipe, PipeTransform } from '@angular/core';

import { AnimeSeason } from '@js-camp/core/models/anime/anime-season';

/** Transform anime season to string.*/
@Pipe({
	name: 'readableAnimeSeason',
	pure: false,
})
export class ReadableAnimeSeasonPipe implements PipeTransform {

	/** @inheritdoc */
	public transform(season: AnimeSeason): string {
		return AnimeSeason.toReadable(season);
	}
}
