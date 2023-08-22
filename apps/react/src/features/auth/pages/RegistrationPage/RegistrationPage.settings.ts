import * as zod from 'zod';

export const validationSchema = zod
	.object({
		email: zod.string().trim()
			.email({ message: 'Enter valid email' }),
		firstName: zod.string().trim(),
		lastName: zod.string().trim(),
		password: zod.string().trim()
			.min(8, { message: 'Min 8 characters' }),
		repeatedPassword: zod.string().trim()
			.min(8, { message: 'Min 8 characters' }),
	})
	.required()
	.refine(data => data.password === data.repeatedPassword, {
		message: 'Passwords don\'t match',
		path: ['repeatedPassword'],
	});
