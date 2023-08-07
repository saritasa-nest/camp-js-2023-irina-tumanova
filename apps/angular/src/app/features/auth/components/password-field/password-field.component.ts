import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, DoCheck, ElementRef, Input, OnDestroy, Optional, Self, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

/** Password field component. */
@Component({
	selector: 'camp-password-field',
	templateUrl: './password-field.component.html',
	styleUrls: ['./password-field.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: PasswordFieldComponent }],
})
export class PasswordFieldComponent implements MatFormFieldControl<string>, OnDestroy, ControlValueAccessor, DoCheck {

	/** Next id for input id.*/
	public static nextId = 0;

	/** @inheritdoc */
	// eslint-disable-next-line rxjs/finnish
	public readonly stateChanges = new Subject<void>();

	/** @inheritdoc */
	public focused = false;

	/** @inheritdoc */
	public get errorState(): boolean {
		return this._errorState;
	}

	private set errorState(value: boolean) {
		this._errorState = value;
	}

	private _errorState = false;

	/** @inheritdoc */
	public controlType = 'password-input';

	/** @inheritdoc */
	public id = `password-input-${PasswordFieldComponent.nextId++}`;

	/** @inheritdoc */
	public describedBy = '';

	/** Is password hidden. */
	public isPasswordHidden = true;

	/** Get form control. */
	@Input({ required: true })
	public set formControl(control: FormControl) {
		this._formControl = control;
	}

	/** Set form control. */
	public get formControl(): FormControl {
		return this._formControl ?? new FormControl('');
	}

	private _formControl: FormControl | null = null;

	/** Autocomplete value. */
	@Input({ required: true })
	public autocomplete = '';

	/** @inheritdoc */
	public get value(): string {
		return this._value;
	}

	/** @inheritdoc */
	private set value(value: string) {
		this._value = value;
		this.onChange(value);
		this.stateChanges.next();
	}

	private _value = '';

	/**
	 * Change password.
	 * @param _value Password.
	 */
	// eslint-disable-next-line no-empty-function
	public onChange(_value: string): void { }

	/** Touch field.*/
	// eslint-disable-next-line no-empty-function
	public onTouched(): void { }

	/** @inheritdoc */
	public get empty(): boolean {
		return this.formControl.value.trim().length === 0;
	}

	/** @inheritdoc */
	public get shouldLabelFloat(): boolean {
		return this.focused || !this.empty;
	}

	/** @inheritdoc */
	@Input()
	public get placeholder(): string {
		return this._placeholder;
	}

	/** @inheritdoc */
	public set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	}

	private _placeholder = '';

	/** @inheritdoc */
	@Input()
	public get required(): boolean {
		return this._required;
	}

	/** @inheritdoc */
	public set required(value: boolean) {
		this._required = coerceBooleanProperty(value);
		this.stateChanges.next();
	}

	private _required = false;

	/** @inheritdoc */
	@Input()
	public get disabled(): boolean {
		return this._disabled;
	}

	/** @inheritdoc */
	public set disabled(value: boolean) {
		this._disabled = coerceBooleanProperty(value);
		this.stateChanges.next();
	}

	private _disabled = false;

	@Optional()
	private readonly formGroup = inject(FormGroupDirective);

	public constructor(
		private _focusMonitor: FocusMonitor,
		private _elementRef: ElementRef<HTMLElement>,
		@Optional() @Self() public ngControl: NgControl,
	) {
		_focusMonitor.monitor(_elementRef, true).subscribe(origin => {
			if (this.focused && !origin) {
				this.onTouched();
			}
			this.focused = !!origin;
			this.stateChanges.next();
		});

		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	/** @inheritdoc */
	public ngDoCheck(): void {
		this.updateErrorState();
	}

	/** Update error state. */
	private updateErrorState(): void {
		const oldState = this.errorState;
		const newState = this.formControl.errors !== null && (this.formControl.touched || this.formGroup.submitted);

		if (oldState !== newState) {
			this._errorState = newState;
			this.stateChanges.next();
		}
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.stateChanges.complete();
		this._focusMonitor.stopMonitoring(this._elementRef);
	}

	/** @inheritdoc */
	public setDescribedByIds(ids: string[]): void {
		this.describedBy = ids.join(' ');
	}

	/** @inheritdoc */
	public onContainerClick(event: MouseEvent): void {
		if ((event.target as Element).tagName.toLowerCase() !== 'input') {
			const input = this._elementRef.nativeElement.querySelector('input');
			if (input) {
				input.focus();
			}
		}
	}

	/** @inheritdoc */
	public writeValue(value: string): void {
		this.value = value;
	}

	/** @inheritdoc */
	public registerOnChange<T extends FunctionStringCallback>(fn: T): void {
		this.onChange = fn;
	}

	/** @inheritdoc */
	public registerOnTouched(fn: VoidFunction): void {
		this.onTouched = fn;
	}

	/** @inheritdoc */
	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	/** @inheritdoc */
	public _handleInput(): void {
		this.onChange(this.value);
	}

	/** Change password visibility. */
	protected changePasswordVisibility(): void {
		this.isPasswordHidden = !this.isPasswordHidden;
	}
}
