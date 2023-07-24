import { TokenDto } from '../../dtos/auth/token.dto';
import { Token } from '../../models/auth/token';

export namespace TokenMapper {

	/**
	 * Maps model to DTO.
	 * @param model Token.
	 */
	export function toDto(model: Token): TokenDto {
		return {
			refresh: model.refresh,
			access: model.access,
		};
	}

	/**
	 * Maps DTO to model.
	 * @param dto Token DTO.
	 */
	export function fromDto(dto: TokenDto): Token {
		return {
			refresh: dto.refresh,
			access: dto.access,
		};
	}
}
