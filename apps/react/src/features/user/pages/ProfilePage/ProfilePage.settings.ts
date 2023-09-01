import * as zod from 'zod';

import { User } from '@js-camp/core/models/user/user';

export const validationSchema = zod
	.object({
		firstName: zod.string().trim()
			.min(1, 'Enter first name'),
		lastName: zod.string().trim()
			.min(1, 'Enter last name'),
		avatarUrl: zod.string().nullable(),
	});

export const defaultProfileValues: User = {
	avatarUrl: null,
	email: '',
	firstName: '',
	lastName: '',
};
