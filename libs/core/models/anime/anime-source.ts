/** Anime source. */
export enum AnimeSource {
	FourKomaMang = 'FourKomaManga',
	Book = 'Book',
	CardGame = 'CardGame',
	LightNovel = 'LightNovel',
	Manga = 'Manga',
	MixedMedia = 'MixedMedia',
	Music = 'Music',
	Novel = 'Novel',
	Original = 'Original',
	PictureBook = 'PictureBook',
	Radio = 'Radio',
	VisualNovel = 'VisualNovel',
	WebManga = 'WebManga',
	WebNovel = 'WebNovel',
	Other = 'Other',
	Unknown = 'Unknown',
	Game = 'Game',
}

export namespace AnimeSource {

	const TO_READABLE_MAP: Readonly<Record<AnimeSource, string>> = {
		[AnimeSource.FourKomaMang]: 'Four KomaMang',
		[AnimeSource.Book]: 'Book',
		[AnimeSource.CardGame]: 'Card game',
		[AnimeSource.LightNovel]: 'Light novel',
		[AnimeSource.Manga]: 'Manga',
		[AnimeSource.MixedMedia]: 'Mixed media',
		[AnimeSource.Music]: 'Music',
		[AnimeSource.Novel]: 'Novel',
		[AnimeSource.Original]: 'Original',
		[AnimeSource.PictureBook]: 'Picture book',
		[AnimeSource.Radio]: 'Radio',
		[AnimeSource.VisualNovel]: 'Visual novel',
		[AnimeSource.WebManga]: 'Web manga',
		[AnimeSource.WebNovel]: 'Web noval',
		[AnimeSource.Other]: 'Other',
		[AnimeSource.Unknown]: 'Unknown',
		[AnimeSource.Game]: 'Game',
	};

	/**
	 * Converts a certain anime source into readable equivalent.
	 * @param source Anime source.
	 */
	export function toReadable(source: AnimeSource): string {
		return TO_READABLE_MAP[source];
	}
}
