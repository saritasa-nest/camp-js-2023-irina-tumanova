import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '@js-camp/angular/shared/shared.module';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimePageComponent } from './anime-page/anime-page.component';

/** Anime module. */
@NgModule({
	declarations: [AnimePageComponent],
	imports: [
		CommonModule,
		SharedModule,
		AnimeRoutingModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatPaginatorModule,
	],
})
export class AnimeModule {}
