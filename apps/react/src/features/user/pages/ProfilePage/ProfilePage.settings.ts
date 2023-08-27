import * as zod from 'zod';

import { User } from '@js-camp/core/models/user/user';

export const validationSchema = zod
	.object({
		email: zod.string().trim()
			.email({ message: 'Enter valid email' }),
		firstName: zod.string().trim(),
		lastName: zod.string().trim(),
		avatarUrl: zod.string().nullable(),
	})
	.required();

export const defaultProfileValues: User = {
	avatarUrl: null,
	email: '',
	firstName: '',
	lastName: '',
};
