import { User } from '@js-camp/core/models/user/user';
import { UserDto } from '@js-camp/core/dtos/user/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user/user.mapper';

import { ApiUrlsConfig } from '../apiUrlsConfig';
import { http } from '..';
import { S3Service } from './s3Bucket';

/** User service. */
export namespace UserService {

	/** Get current user. */
	export async function getCurrentUser(): Promise<User> {
		const { data: userDto } = await http.get<UserDto>(ApiUrlsConfig.user.getCurrent);
		return UserMapper.fromDto(userDto);
	}

	/**
	 * Update current user.
	 * @param image Image file.
	 * @param user User.
	 */
	export async function updateCurrentUser(image: File | null, user: User): Promise<User> {
		let { avatarUrl } = user;

		if (image !== null) {
			avatarUrl = await S3Service.saveImage({
				imageDest: 'user_avatars',
				imageFile: image,
				imageName: image.name,
			});
		}

		const { data } = await http.put(ApiUrlsConfig.user.updateCurrent, UserMapper.toDto({ ...user, avatarUrl }));
		return UserMapper.fromDto(data);
	}
}
