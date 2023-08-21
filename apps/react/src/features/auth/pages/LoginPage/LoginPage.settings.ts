import * as zod from 'zod';

export const validationSchema = zod
	.object({
		email: zod.string().trim()
			.email({ message: 'Enter valid email' }),
		password: zod.string().trim()
			.min(8, { message: 'Min 8 characters' }),
	})
	.required();
