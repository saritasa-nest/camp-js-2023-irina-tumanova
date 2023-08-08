import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, DoCheck, ElementRef, Input, OnDestroy, Optional, Self, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject, Subject } from 'rxjs';

type ChangeFunction<TValue> = (data: TValue) => void;

type FileControlValue = File | null;

const ACCEPT_IMAGE_TYPE = ['image/jpeg', 'image/png', 'image/webp'];

/** Upload image component. */
@Component({
	selector: 'camp-upload-image',
	templateUrl: './upload-image.component.html',
	styleUrls: ['./upload-image.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: UploadImageComponent }],
})
export class UploadImageComponent implements MatFormFieldControl<FileControlValue>, OnDestroy, ControlValueAccessor, DoCheck {

	/** Image url. */
	protected readonly imageUrl$ = new BehaviorSubject<string | null>(null);

	/** Image max size. */
	@Input()
	public maxSize = 8 * 1024 * 1024 * 3;

	/** Default image url. */
	@Input()
	public set defaultImageUrl(value: string | null) {
		this.imageUrl$.next(value);
		this._defaultImageUrl = value;
	}

	/** Default image url. */
	public get defaultImageUrl(): string | null {
		return this._defaultImageUrl;
	}

	private _defaultImageUrl: string | null = null;

	private readonly _elementRef = inject(ElementRef<HTMLElement>);

	/** Form control. */
	@Input({ required: true })
	public set formControl(control: FormControl) {
		this._formControl = control;
	}

	/** Form control. */
	public get formControl(): FormControl {
		return this._formControl ?? new FormControl('');
	}

	private _formControl: FormControl | null = null;

	@Optional()
	private readonly formGroup = inject(FormGroupDirective);

	// #region Implementing Interface Variables

	/** Next id for select id.*/
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
	public controlType = 'upload-image';

	/** @inheritdoc */
	public id = `upload-image-${UploadImageComponent.nextId++}`;

	/** @inheritdoc */
	public describedBy = '';

	/** @inheritdoc */
	@Input()
	public get value(): FileControlValue {
		return this._value;
	}

	/** @inheritdoc */
	private set value(value: FileControlValue) {
		this.setImageUrl(value);

		this._value = value;
		this.onChange(value);
		this.stateChanges.next();
	}

	private _value: FileControlValue = null;

	/**
	 * Change value.
	 * @param _value Value.
	 */
	// eslint-disable-next-line no-empty-function
	public onChange(_value: string | File | null): void {}

	/** Touch field.*/
	// eslint-disable-next-line no-empty-function
	public onTouched(): void {}

	/** @inheritdoc */
	public get empty(): boolean {
		return this.formControl.value === null && this.defaultImageUrl === null;
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

	// #endregion

	/**
	 * @param ngControl Ng control.
	 */
	public constructor(
		@Optional() @Self() public readonly ngControl: NgControl,
	) {
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
	}

	private setImageUrl(value: string | null | File): void {
		if (value instanceof File) {
			this.imageUrl$.next(URL.createObjectURL(value));
		} else {
			this.imageUrl$.next(value);
		}
	}

	/**
	 * Upload image.
	 * @param target Image input.
	 */
	protected upload(target: EventTarget | null): void {
		if (target === null) {
			return;
		}

		const { files } = target as HTMLInputElement;
		if (files === null) {
			return;
		}
		const file = files[0];

		if (!ACCEPT_IMAGE_TYPE.includes(file.type)) {
			this.formControl.setErrors({ acceptType: true });
			return;
		}
		if (file.size > this.maxSize) {
			this.formControl.setErrors({ maxSize: true });
			return;
		}

		this.value = file;
	}

	// #region Implementing Interface Methods

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
	public writeValue(value: FileControlValue): void {
		this.value = value;
	}

	/** @inheritdoc */
	public registerOnChange<T extends ChangeFunction<string | File>>(fn: T): void {
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

	// #endregion
}
