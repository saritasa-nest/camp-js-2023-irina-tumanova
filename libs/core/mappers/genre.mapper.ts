import { GenreDto } from '../dtos/genre.dto';
import { Genre } from '../models/genre';

export namespace GenreMapper {

	/**
	 * Maps dto to model.
	 * @param dto Genre dto.
	 */
	export function fromDto(dto: GenreDto): Genre {
		return new Genre({
			id: dto.id,
			name: dto.name,
		});
	}
}
