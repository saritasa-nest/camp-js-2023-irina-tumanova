import * as zod from 'zod';

export const validationSchema = zod.object({
	email: zod.string().trim()
		.min(1, { message: 'Enter email' })
		.email({ message: 'Enter valid email' }),
	password: zod.string().trim()
		.min(1, { message: 'Enter password' })
		.min(8, { message: 'Min 8 characters' }),
});
