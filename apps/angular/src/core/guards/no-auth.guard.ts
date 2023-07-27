import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

/** No auth guard. */
export const noAuthGuard: CanActivateFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);
	return authService.isAuth$.pipe(
		first(),
		map(isAuth => {
			if (isAuth) {
				router.navigate(['']);
			}
			return !isAuth;
		}),
	);
};
