import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Input, inject, Optional, Self, ElementRef, OnDestroy, DoCheck, Directive } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

type ChangeFunction<TValue> = (data: TValue) => void;

type FormControlValue<TValue> = TValue | null;

/** Base mat form field component. */
@Directive()
export abstract class BaseMatFormField<TValue>
implements MatFormFieldControl<FormControlValue<TValue>>, OnDestroy, ControlValueAccessor, DoCheck {

	/** Element ref. */
	protected readonly _elementRef = inject(ElementRef<HTMLElement>);

	@Optional()
	private readonly formGroup = inject(FormGroupDirective);

	/** Form builder. */
	protected readonly formBuilder = inject(NonNullableFormBuilder);

	/** Form control. */
	public get formControl(): FormControl<FormControlValue<TValue>> {
		return this.ngControl.control as FormControl<FormControlValue<TValue>>;
	}

	/** Next id.*/
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
	public controlType = 'base-mat-form-field';

	/** @inheritdoc */
	public id = `${this.controlType}-${BaseMatFormField.nextId++}`;

	/** @inheritdoc */
	public describedBy = '';

	/** @inheritdoc */
	public get value(): FormControlValue<TValue> {
		return this._value;
	}

	/** @inheritdoc */
	protected set value(value: FormControlValue<TValue>) {
		this._value = value;
		this.onChange(value);
		this.stateChanges.next();
	}

	/** Value. */
	protected _value: FormControlValue<TValue> = null;

	/**
	 * Change value.
	 * @param _value Value.
	 */
	// eslint-disable-next-line no-empty-function
	public onChange(_value: FormControlValue<TValue>): void {}

	/** Touch field.*/
	// eslint-disable-next-line no-empty-function
	public onTouched(): void {}

	/** @inheritdoc */
	public get empty(): boolean {
		if (this.formControl === null) {
			return true;
		}
		return this.checkValueIsEmpty(this.formControl.value);
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

	/** Ng control. */
	@Optional() @Self()
	public readonly ngControl = inject(NgControl);

	public constructor() {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	/**
	 * Check value is empty.
	 * @param value Field value.
	 */
	protected abstract checkValueIsEmpty(value: FormControlValue<TValue>): boolean;

	/** @inheritdoc */
	public ngDoCheck(): void {
		this.updateErrorState();
	}

	/** Update error state. */
	private updateErrorState(): void {
		if (this.formControl === null) {
			return;
		}
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
	}

	/** @inheritdoc */
	public setDescribedByIds(ids: string[]): void {
		this.describedBy = ids.join(' ');
	}

	/** @inheritdoc */
	public writeValue(value: FormControlValue<TValue>): void {
		this.value = value;
	}

	/** @inheritdoc */
	public registerOnChange<T extends ChangeFunction<FormControlValue<TValue>>>(fn: T): void {
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

	/** @inheritdoc */
	public onContainerClick(event: MouseEvent): void {
		if ((event.target as Element).tagName.toLowerCase() !== 'input') {
			const input = this._elementRef.nativeElement.querySelector('input');
			if (input) {
				input.focus();
			}
		}
	}
}
