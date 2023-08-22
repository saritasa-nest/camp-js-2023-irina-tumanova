import { GenreType } from '../../../core/models/genre/genre-type';
import { GenreDto, GenreTypeDto } from '../../dtos/genre/genre.dto';
import { Genre } from '../../models/genre/genre';

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

	const GENRE_TYPE_FROM_DTO: Record<GenreTypeDto, GenreType> = {
		[GenreTypeDto.Demographics]: GenreType.Demographics,
		[GenreTypeDto.ExplicitGenres]: GenreType.ExplicitGenres,
		[GenreTypeDto.Genres]: GenreType.Genres,
		[GenreTypeDto.Themes]: GenreType.Themes,
	};

	export const GENRE_TYPE_TO_DTO: Record<GenreType, GenreTypeDto> = {
		[GenreType.Demographics]: GenreTypeDto.Demographics,
		[GenreType.ExplicitGenres]: GenreTypeDto.ExplicitGenres,
		[GenreType.Genres]: GenreTypeDto.Genres,
		[GenreType.Themes]: GenreTypeDto.Themes,
	};
}
