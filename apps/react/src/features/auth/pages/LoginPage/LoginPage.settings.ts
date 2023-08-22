import { z } from 'zod';

export const validationSchema = z
	.object({
		email: z.string().trim()
			.email({ message: 'Enter valid email' }),
		password: z.string().trim()
			.min(8, { message: 'Min 8 characters' }),
	})
	.required();
