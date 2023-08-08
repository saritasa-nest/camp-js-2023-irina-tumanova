import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '@js-camp/angular/core/guards/auth.guard';

import { AnimePageComponent } from './anime-page/anime-page.component';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';
import { AnimeCreatePageComponent } from './anime-manage/anime-create-page/anime-create-page.component';
import { AnimeEditPageComponent } from './anime-manage/anime-edit-page/anime-edit-page.component';

const routes: Routes = [
	{
		path: '',
		component: AnimePageComponent,
	},
	{
		path: 'create',
		component: AnimeCreatePageComponent,
		canActivate: [authGuard],
	},
	{
		path: ':id',
		canActivate: [authGuard],
		children: [
			{
				path: '',
				component: AnimeDetailsPageComponent,
			},
			{
				path: 'edit',
				component: AnimeEditPageComponent,
			},
		],
	},
];

/** Anime table view routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
