import { UserDto } from '../../dtos/user/user.dto';
import { User } from '../../models/user/user';

export namespace UserMapper {

	/**
	 * Maps DTO to model.
	 * @param dto User DTO.
	 */
	export function fromDto(dto: UserDto): User {
		return new User({
			email: dto.email,
			firstName: dto.first_name,
			lastName: dto.last_name,
			avatarUrl: dto.avatar,
		});
	}

	/**
	 * Maps model to DTO.
	 * @param model User.
	 */
	export function toDto(model: User): UserDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			avatar: model.avatarUrl,
		};
	}
}
