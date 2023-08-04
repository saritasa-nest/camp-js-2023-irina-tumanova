import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Auth guard.
 * @param _routeSnapshot Route snapshot.
 * @param routerSnapshot Router snapshot.
 */
export const authGuard: CanActivateFn = (_routeSnapshot, routerSnapshot) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.isAuth$.pipe(
		first(),
		map(isAuth => {
			if (!isAuth) {
				router.navigate(['auth'], { queryParams: { next: encodeURIComponent(routerSnapshot.url) } });
			}
			return isAuth;
		}),
	);
};
