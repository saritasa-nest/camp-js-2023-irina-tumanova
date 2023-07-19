import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimePageComponent } from './anime-page/anime-page.component';

const routes: Routes = [
	{
		path: '',
		component: AnimePageComponent,
	},
];

/** Anime table view routing module. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AnimeRoutingModule {}
