import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ShadowSpinnerComponent } from './components/shadow-spinner/shadow-spinner.component';
import { SenternseCasePipe } from './pipes/sentensecase';
import { FieldErrorTextPipe } from './pipes/field-error-text';
import { ReadableTextFromArrayPipe } from './pipes/readable-text-from-array';
import { SelectWithInputComponent } from './components/select-with-input/select-with-input.component';

/** Shared module. */
@NgModule({
	declarations: [ShadowSpinnerComponent, SenternseCasePipe, FieldErrorTextPipe, ReadableTextFromArrayPipe, SelectWithInputComponent],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatIconModule,
		MatButtonModule,
		ReactiveFormsModule,
		FormsModule,
	],
	exports: [ShadowSpinnerComponent, SenternseCasePipe, FieldErrorTextPipe, ReadableTextFromArrayPipe, SelectWithInputComponent],
})
export class SharedModule {}
