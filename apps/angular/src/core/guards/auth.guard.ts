import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service';

/** Auth guard. */
export const AuthGuard: CanActivateFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);
	return authService.isAuth$.pipe(
		map(isAuth => {
			if (!isAuth) {
				router.navigate(['auth']);
			}
			return isAuth;
		}),
	);
};
