import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeComponent } from './anime.component';
import { AnimeTableComponent } from './anime-table/anime-table.component';

const routes: Routes = [
	{
		path: '',
		component: AnimeComponent,
		children: [
			{
				path: '',
				component: AnimeTableComponent,
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
