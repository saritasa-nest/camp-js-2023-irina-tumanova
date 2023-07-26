import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

/** Password field component. */
@Component({
	selector: 'camp-password-field',
	templateUrl: './password-field.component.html',
	styleUrls: ['./password-field.component.css'],

	// This is necessary to redraw the field when receiving errors from the server.
	changeDetection: ChangeDetectionStrategy.Default,
})
export class PasswordFieldComponent {

	/** Is the password hidden. */
	protected shouldPasswordBeHidden = true;

	/** Password control. */
	@Input() public control = new FormControl('');

	/** Change password visibility. */
	protected changePasswordVisibility(): void {
		this.shouldPasswordBeHidden = !this.shouldPasswordBeHidden;
	}
}
