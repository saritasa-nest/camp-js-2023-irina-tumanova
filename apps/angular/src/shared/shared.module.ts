import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShadowSpinnerComponent } from './components/shadow-spinner/shadow-spinner.component';
import { SenternseCasePipe } from './pipes/sentensecase';
import { FieldErrorTextPipe } from './pipes/field-error-text';
import { ReadableTextFromArrayPipe } from './pipes/readable-text-from-array';

/** Shared module. */
@NgModule({
	declarations: [ShadowSpinnerComponent, SenternseCasePipe, FieldErrorTextPipe, ReadableTextFromArrayPipe],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
	],
	exports: [ShadowSpinnerComponent, SenternseCasePipe, FieldErrorTextPipe, ReadableTextFromArrayPipe],
})
export class SharedModule {}
