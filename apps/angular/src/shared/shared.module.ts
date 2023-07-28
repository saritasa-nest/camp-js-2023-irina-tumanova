import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShadowSpinnerComponent } from './components/shadow-spinner/shadow-spinner.component';
import { SenternseCasePipe } from './pipes/sentensecase';
import { FieldErrorTextPipe } from './pipes/field-error-text';
import { ObjectsListViewPipe } from './pipes/objects-list-view';

/** Shared module. */
@NgModule({
	declarations: [ShadowSpinnerComponent, SenternseCasePipe, FieldErrorTextPipe, ObjectsListViewPipe],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
	],
	exports: [ShadowSpinnerComponent, SenternseCasePipe, FieldErrorTextPipe, ObjectsListViewPipe],
})
export class SharedModule {}
