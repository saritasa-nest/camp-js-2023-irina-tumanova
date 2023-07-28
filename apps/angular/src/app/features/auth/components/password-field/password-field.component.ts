import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';

/** Password field component. */
@Component({
	selector: 'camp-password-field',
	templateUrl: './password-field.component.html',
	styleUrls: ['./password-field.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent implements OnInit {

	/** Is the password hidden. */
	protected shouldPasswordBeHidden = true;

	/** Password control. */
	@Input({ required: true })
	public control: FormControl<string> | null = null;

	/** Field name. */
	@Input({ required: true })
	public fieldName: string | null = null;

	/** Field name. */
	@Input({ required: true })
	public autocompleteValue: string | null = null;

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	private readonly untilDestroyed = untilDestroyed();

	/** @inheritdoc */
	public ngOnInit(): void {
		if (this.control === null) {
			return;
		}

		this.control.statusChanges
			.pipe(this.untilDestroyed())
			.subscribe(() => this.changeDetectorRef.markForCheck());
	}

	/** Change password visibility. */
	protected changePasswordVisibility(): void {
		this.shouldPasswordBeHidden = !this.shouldPasswordBeHidden;
	}
}
