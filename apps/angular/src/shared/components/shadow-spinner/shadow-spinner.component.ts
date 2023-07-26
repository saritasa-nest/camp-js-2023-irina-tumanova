import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Spiner component. */
@Component({
	selector: 'camp-shadow-spinner',
	templateUrl: './shadow-spinner.component.html',
	styleUrls: ['./shadow-spinner.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowSpinnerComponent {}
