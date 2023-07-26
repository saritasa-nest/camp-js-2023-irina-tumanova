import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShadowSpinnerComponent } from './components/shadow-spinner/shadow-spinner.component';

/** Shared module. */
@NgModule({
	declarations: [ShadowSpinnerComponent],
	imports: [
		CommonModule,
		MatProgressSpinnerModule,
	],
	exports: [ShadowSpinnerComponent],
})
export class SharedModule {}
