import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
	},
	{
		path: 'signup',
		title: 'Sign Up',
		component: RegisterPageComponent,
	},
];

/** Anime table view routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
