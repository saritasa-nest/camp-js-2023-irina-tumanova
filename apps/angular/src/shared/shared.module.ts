import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ShadowSpinnerComponent } from './components/shadow-spinner/shadow-spinner.component';
import { SenternseCasePipe } from './pipes/sentensecase';
import { FieldErrorTextPipe } from './pipes/field-error-text';
import { ReadableTextFromArrayPipe } from './pipes/readable-text-from-array';
import { SelectWithCreateComponent } from './components/select-with-create/select-with-create.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ReadableAnimeStatusPipe } from './pipes/readable-anime-status';
import { ReadableAnimeSeasonPipe } from './pipes/readable-anime-season';
import { ReadableAnimeSourcePipe } from './pipes/readable-anime-source';
import { YesNoPipe } from './pipes/yes-no-pipe';
import { ReadableTextFromObjectPipe } from './pipes/readable-text-from-object';

const sharedElements = [
	ShadowSpinnerComponent,
	SenternseCasePipe,
	FieldErrorTextPipe,
	ReadableTextFromArrayPipe,
	SelectWithCreateComponent,
	UploadImageComponent,
	ReadableAnimeStatusPipe,
	ReadableAnimeSeasonPipe,
	ReadableAnimeSourcePipe,
	ReadableTextFromObjectPipe,
	YesNoPipe,
];

const sharedElements = [
	ShadowSpinnerComponent,
	SenternseCasePipe,
	FieldErrorTextPipe,
	ReadableTextFromArrayPipe,
	ReadableAnimeStatusPipe,
	ReadableAnimeSeasonPipe,
	ReadableAnimeSourcePipe,
	YesNoPipe,
];

/** Shared module. */
@NgModule({
	declarations: sharedElements,
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatIconModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatChipsModule,
		InfiniteScrollModule,
	],
	exports: sharedElements,
})
export class SharedModule {}
