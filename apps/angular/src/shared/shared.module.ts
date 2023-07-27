import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShadowSpinnerComponent } from './components/shadow-spinner/shadow-spinner.component';
import { SenternseCasePipe } from './pipes/sentensecase';
import { FieldErrorTextPipe } from './pipes/field-error-text';

/** Shared module. */
@NgModule({
	declarations: [ShadowSpinnerComponent, SenternseCasePipe, FieldErrorTextPipe],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
	],
	exports: [ShadowSpinnerComponent, SenternseCasePipe, FieldErrorTextPipe],
})
export class SharedModule {}
