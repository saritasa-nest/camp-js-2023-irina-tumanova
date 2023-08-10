import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShadowSpinnerComponent } from './components/shadow-spinner/shadow-spinner.component';
import { SenternseCasePipe } from './pipes/sentensecase';
import { FieldErrorTextPipe } from './pipes/field-error-text';
import { ReadableTextFromArrayPipe } from './pipes/readable-text-from-array';
import { ReadableAnimeStatusPipe } from './pipes/readable-anime-status';
import { ReadableAnimeSeasonPipe } from './pipes/readable-anime-season';
import { ReadableAnimeSourcePipe } from './pipes/readable-anime-source';
import { YesNoPipe } from './pipes/yes-no-pipe';

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
	],
	exports: sharedElements,
})
export class SharedModule {}
