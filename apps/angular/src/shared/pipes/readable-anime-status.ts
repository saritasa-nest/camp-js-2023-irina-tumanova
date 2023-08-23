import { Pipe, PipeTransform } from '@angular/core';

import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';

/** Transform anime status to string.*/
@Pipe({
	name: 'readableAnimeStatus',
	pure: false,
})
export class ReadableAnimeStatusPipe implements PipeTransform {

	/** @inheritdoc */
	public transform(status: AnimeStatus): string {
		return AnimeStatus.toReadable(status);
	}
}
