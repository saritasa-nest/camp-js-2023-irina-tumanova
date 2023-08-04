import { EntityValidationErrors } from '../app-error';

/** Required data for login. */
export class Login {

	/** Email. */
	public readonly email: string;

	/** Password. */
	public readonly password: string;

	public constructor({ email, password }: InitLoginParams) {
		this.email = email;
		this.password = password;
	}
}

type InitLoginParams = Login;

export type LoginValidationErrors = EntityValidationErrors<{[K in keyof Login]?: string}>;
