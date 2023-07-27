import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShadowSpinnerComponent } from './components/shadow-spinner/shadow-spinner.component';
import { SenternseCasePipe } from './pipes/sentensecase';

/** Shared module. */
@NgModule({
	declarations: [ShadowSpinnerComponent, SenternseCasePipe],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
	],
	exports: [ShadowSpinnerComponent, SenternseCasePipe],
})
export class SharedModule {}
