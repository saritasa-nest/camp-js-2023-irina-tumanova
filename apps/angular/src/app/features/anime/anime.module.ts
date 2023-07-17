import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { AnimeComponent } from './anime.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Anime module. */
@NgModule({
	declarations: [AnimeComponent, AnimeTableComponent],
	imports: [
		CommonModule,
		AnimeRoutingModule,
		MatToolbarModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatTableModule,
	],
})
export class AnimeModule {}
