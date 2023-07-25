import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '@js-camp/angular/core/guards/no-auth.guard';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'signin',
		pathMatch: 'prefix',
	},
	{
		path: 'signin',
		title: 'Sign In',
		component: LoginPageComponent,
		canActivate: [NoAuthGuard],
	},
	{
		path: 'signup',
		title: 'Sign Up',
		component: RegisterPageComponent,
		canActivate: [NoAuthGuard],
	},
];

/** Anime table view routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
