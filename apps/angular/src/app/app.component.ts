import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Observable, map, switchMap, tap } from 'rxjs';

import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { untilDestroyed } from '../shared/pipes/until-destroyed';

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

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.isAuth$ = this.authService.isAuth$;
	}

	/** Log out. */
	protected logout(): void {
		this.authService.logout().pipe(
			tap(() => this.router.navigate(['auth/login'])),
			tap(this.untilDestroyed()),
		)
			.subscribe();
	}
}
