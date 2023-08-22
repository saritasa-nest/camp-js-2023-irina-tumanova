import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { noAuthGuard } from '@js-camp/angular/core/guards/no-auth.guard';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

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
		canActivate: [noAuthGuard],
	},
	{
		path: 'signup',
		title: 'Sign Up',
		component: RegistrationPageComponent,
		canActivate: [noAuthGuard],
	},
];

/** Anime table view routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
