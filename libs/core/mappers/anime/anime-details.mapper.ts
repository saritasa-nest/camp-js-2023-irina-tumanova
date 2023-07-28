import { AnimeDetailsDto } from '../../dtos/anime/anime-details.dto';
import { AnimeDetails } from '../../models/anime/anime-details';

import { AnimeMapper } from './anime.mapper';
import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';

export namespace AnimeDetailsMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Studio DTO.
	 */
	export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
		return new AnimeDetails({
			...AnimeMapper.fromDto(dto),
			description: dto.synopsis,
			airing: dto.airing,
			studios: dto.studios,
			studiosData: dto.studios_data.map(StudioMapper.fromDto),
			genres: dto.genres,
			genresData: dto.genres_data.map(GenreMapper.fromDto),
			trailerYoutubeUrl: `https://www.youtube.com/embed/${dto.trailer_youtube_id}`,
		});
	}
}
