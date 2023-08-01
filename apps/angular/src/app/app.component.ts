import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, first, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

	/** User is auth. */
	protected readonly isAuth$: Observable<boolean>;

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	public constructor() {
		this.isAuth$ = this.authService.isAuth$;
	}

	/** Log out. */
	protected logout(): void {
		this.authService.logout().pipe(
			first(),
			switchMap(() => this.router.navigate(['auth/signin'])),
		)
			.subscribe();
	}
}
