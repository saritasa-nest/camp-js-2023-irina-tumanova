import { ChangeDetectionStrategy, Component } from '@angular/core';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
