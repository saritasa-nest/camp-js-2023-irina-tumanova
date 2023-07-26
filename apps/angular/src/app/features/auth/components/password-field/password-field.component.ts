import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

/** Spiner component. */
@Component({
	selector: 'camp-password-field',
	templateUrl: './password-field.component.html',
	styleUrls: ['./password-field.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent {

	/** Is the password hidden. */
	protected shouldPasswordBeHidden = true;

	/** Password control. */
	@Input() public control = new FormControl();

	/** Change password visibility. */
	protected changePasswordVisibility(): void {
		this.shouldPasswordBeHidden = !this.shouldPasswordBeHidden;
	}
}
