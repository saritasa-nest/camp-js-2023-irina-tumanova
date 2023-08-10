import * as zod from 'zod';

export const validationSchema = zod.object({
	email: zod.string().trim()
		.min(1, { message: 'Enter email' })
		.email({ message: 'Enter valid email' }),
	firstName: zod.string().trim()
		.min(1, { message: 'Enter first name' }),
	lastName: zod.string().trim()
		.min(1, { message: 'Enter last name' }),
	password: zod.string().trim()
		.min(1, { message: 'Enter password' })
		.min(8, { message: 'Min 8 characters' }),
	repeatedPassword: zod.string().trim()
		.min(1, { message: 'Enter confirm password' })
		.min(8, { message: 'Min 8 characters' }),
})
	.refine(data => data.password === data.repeatedPassword, {
		message: 'Passwords don\'t match',
		path: ['repeatedPassword'],
	});
