import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimePageComponent } from './anime-page/anime-page.component';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';

/** Anime module. */
@NgModule({
	declarations: [AnimePageComponent, AnimeDetailsPageComponent],
	imports: [
		CommonModule,
		SharedModule,
		AnimeRoutingModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		FormsModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatFormFieldModule,
		MatInputModule,
	],
	providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
})
export class AnimeModule {}
