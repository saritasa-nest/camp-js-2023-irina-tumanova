import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AnimePageComponent } from './anime-page.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Anime module. */
@NgModule({
	declarations: [AnimePageComponent, AnimeTableComponent],
	imports: [
		CommonModule,
		SharedModule,
		AnimeRoutingModule,
		MatToolbarModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatPaginatorModule,
		HttpClientModule,
	],
})
export class AnimeModule {}
