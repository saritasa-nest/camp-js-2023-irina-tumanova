import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Not found component. */
@Component({
	selector: 'camp-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
