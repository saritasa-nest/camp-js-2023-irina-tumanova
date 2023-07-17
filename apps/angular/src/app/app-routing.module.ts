import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'anime',
		pathMatch: 'full',
	},
	{
		path: 'anime',
		title: 'Anime',
		loadChildren: () => import('./features/anime/anime.module').then(m => m.AnimeModule),
	},
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
