import { GenreDto, GenreTypeDto } from '../../dtos/anime/genre.dto';
import { Genre, GenreType } from '../../models/anime/genre';

export namespace GenreMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Genre DTO.
	 */
	export function fromDto(dto: GenreDto): Genre {
		return new Genre({
			id: dto.id,
			name: dto.name,
			type: GENRE_TYPE_FROM_DTO[dto.type],
			created: new Date(dto.created),
			modified: new Date(dto.modified),
		});
	}

	const GENRE_TYPE_FROM_DTO = {
		[GenreTypeDto.Demographics]: GenreType.Demographics,
		[GenreTypeDto.ExplicitGenres]: GenreType.ExplicitGenres,
		[GenreTypeDto.Genres]: GenreType.Genres,
		[GenreTypeDto.Themes]: GenreType.Themes,
	};
}
