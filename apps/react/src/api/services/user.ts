import { User } from '@js-camp/core/models/user/user';
import { UserDto } from '@js-camp/core/dtos/user/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user/user.mapper';

import { ApiUrlsConfig } from '../apiUrlsConfig';
import { http } from '..';

/** User service. */
export namespace UserService {

	/** Get current user. */
	export async function getCurrentUser(): Promise<User> {
		const { data: userDto } = await http.get<UserDto>(ApiUrlsConfig.user.getCurrent);
		return UserMapper.fromDto(userDto);
	}
}
