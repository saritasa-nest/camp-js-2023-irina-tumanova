import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '@js-camp/angular/core/guards/auth.guard';

import { AnimePageComponent } from './anime-page/anime-page.component';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';

const routes: Routes = [
	{
		path: '',
		component: AnimePageComponent,
	},
	{
		path: ':id',
		component: AnimeDetailsPageComponent,
		canActivate: [authGuard],
	},
];

/** Anime table view routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
