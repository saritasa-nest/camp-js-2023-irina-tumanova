import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'anime',
		pathMatch: 'full',
	},
	{
		path: 'anime',
		title: 'Anime',
		loadChildren: () => import('./features/anime/anime.module').then(module => module.AnimeModule),
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
