import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BaseMatFormField } from '@js-camp/angular/shared/components/base-mat-form-field/base-mat-form-field.component';

/** Password field component. */
@Component({
	selector: 'camp-password-field',
	templateUrl: './password-field.component.html',
	styleUrls: ['./password-field.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: PasswordFieldComponent }],
})
export class PasswordFieldComponent extends BaseMatFormField<string> {

	/** Autocomplete value. */
	@Input({ required: true })
	public autocomplete = '';

	/** @inheritdoc */
	public override controlType = 'password-input';

	/** Is password hidden. */
	public isPasswordHidden = true;

	public constructor(private _focusMonitor: FocusMonitor) {
		super();
		_focusMonitor.monitor(this._elementRef, true).subscribe(origin => {
			if (this.focused && !origin) {
				this.onTouched();
			}
			this.focused = !!origin;
			this.stateChanges.next();
		});
	}

	/** @inheritdoc */
	protected override checkValueIsEmpty(value: string | null): boolean {
		return value === null || value.trim().length === 0;
	}

	/** Change password visibility. */
	protected changePasswordVisibility(): void {
		this.isPasswordHidden = !this.isPasswordHidden;
	}
}
