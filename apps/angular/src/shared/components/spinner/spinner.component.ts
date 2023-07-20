import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Spiner component. */
@Component({
	selector: 'camp-spinner',
	templateUrl: './spinner.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
