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
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimePageComponent } from './anime-page/anime-page.component';
import { AnimeDetailsPageComponent } from './anime-details-page/anime-details-page.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { AnimeCreatePageComponent } from './anime-manage/anime-create-page/anime-create-page.component';
import { AnimeEditPageComponent } from './anime-manage/anime-edit-page/anime-edit-page.component';
import { AnimeFormComponent } from './anime-manage/anime-form/anime-form.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

/** Anime module. */
@NgModule({
	declarations: [
		AnimePageComponent,
		AnimeCreatePageComponent,
		AnimeEditPageComponent,
		AnimeDetailsPageComponent,
		ImageModalComponent,
		DeleteModalComponent,
		AnimeFormComponent,
	],
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
		MatDialogModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
	],
	providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
})
export class AnimeModule {}
