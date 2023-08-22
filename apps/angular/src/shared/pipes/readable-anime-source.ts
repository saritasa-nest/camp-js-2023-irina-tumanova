import { Pipe, PipeTransform } from '@angular/core';

import { AnimeSource } from '@js-camp/core/models/anime/anime-source';

/** Transform anime source to string.*/
@Pipe({
	name: 'readableAnimeSource',
	pure: false,
})
export class ReadableAnimeSourcePipe implements PipeTransform {

	/** @inheritdoc */
	public transform(source: AnimeSource): string {
		return AnimeSource.toReadable(source);
	}
}
