import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, Output, inject, EventEmitter, Optional, Self, ElementRef, OnDestroy, DoCheck } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, ReplaySubject, Subject, combineLatest, map, startWith } from 'rxjs';

type ChangeFunction<TValue> = (data: TValue[]) => void;

/** Select with input component. */
@Component({
	selector: 'camp-select-with-input',
	templateUrl: './select-with-input.component.html',
	styleUrls: ['./select-with-input.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: SelectWithInputComponent }],
})
export class SelectWithInputComponent<TItem, TValue> implements MatFormFieldControl<TValue[]>, OnDestroy, ControlValueAccessor, DoCheck {

	/** Item key for get item value. */
	@Input({ required: true })
	public valueKey: keyof TItem | null = null;

	/** Item key for get item name. */
	@Input({ required: true })
	public nameKey: keyof TItem | null = null;

	/** Select items. */
	@Input({ required: true })
	public set items(value: readonly TItem[]) {
		this.items$.next(value);
	}

	private readonly items$ = new ReplaySubject<readonly TItem[]>(1);

	/** Item key for get item name. */
	@Output()
	public createItemEvent = new EventEmitter<string>();

	/** Filtered items. */
	protected readonly filteredItems$: Observable<readonly TItem[]>;

	/** Select's input controller. */
	protected readonly inputControl: FormControl<string>;

	private readonly _elementRef = inject(ElementRef<HTMLElement>);

	private readonly formBuider = inject(NonNullableFormBuilder);

	/** Form control. */
	@Input({ required: true })
	public set formControl(control: FormControl<readonly TValue[]>) {
		this._formControl = control;
	}

	/** Form control. */
	public get formControl(): FormControl<readonly TValue[]> {
		return this._formControl ?? this.formBuider.control<TValue[]>([]);
	}

	private _formControl: FormControl<readonly TValue[]> | null = null;

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
	public controlType = 'select-with-input';

	/** @inheritdoc */
	public id = `select-with-input-${SelectWithInputComponent.nextId++}`;

	/** @inheritdoc */
	public describedBy = '';

	/** @inheritdoc */
	@Input()
	public get value(): TValue[] {
		return this._value;
	}

	/** @inheritdoc */
	private set value(value: TValue[]) {
		this._value = value;
		this.onChange(value);
		this.stateChanges.next();
	}

	private _value: TValue[] = [];

	/**
	 * Change value.
	 * @param _value Value.
	 */
	// eslint-disable-next-line no-empty-function
	public onChange(_value: TValue[]): void {}

	/** Touch field.*/
	// eslint-disable-next-line no-empty-function
	public onTouched(): void {}

	/** @inheritdoc */
	public get empty(): boolean {
		return this.formControl.value.length === 0;
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

		this.inputControl = this.formBuider.control('');
		this.filteredItems$ = this.createFilteredItemsStream();
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

	private createFilteredItemsStream(): Observable<readonly TItem[]> {
		return combineLatest([
			this.items$,
			this.inputControl.valueChanges.pipe(startWith('')),
		]).pipe(
			map(([items, search]) => this.filterItems(items, search, this.value)),
		);
	}

	private filterItems(items: readonly TItem[], search: string, selectedItemsValue: readonly TValue[]): TItem[] {
		return items.filter(item =>
			this.checkItemMatchesSearch(item, search) ||
			this.checkItemIsSelected(item, selectedItemsValue));
	}

	private checkItemMatchesSearch(item: TItem, search: string): boolean {
		if (this.nameKey === null) {
			return false;
		}

		return String(item[this.nameKey]).toLowerCase()
			.includes(search.toLowerCase());
	}

	private checkItemIsSelected(item: TItem, selectedItems: readonly TValue[]): boolean {
		if (this.valueKey === null) {
			return false;
		}

		return selectedItems.includes(item[this.valueKey] as TValue);
	}

	/**
	 * Handle select opened state change.
	 * @param isClosed Select is closed.
	 */
	protected handleSelectOpenedChange(isClosed: boolean): void {
		if (isClosed) {
			this.clearSelectInput();
		}
	}

	private clearSelectInput(): void {
		this.inputControl.setValue('');
	}

	/** Create item. */
	protected createItem(): void {
		const itemName = this.inputControl.getRawValue().trim();

		if (itemName.length === 0) {
			return;
		}

		this.createItemEvent.emit(itemName);
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
			this.onTouched();
		}
	}

	/** @inheritdoc */
	public writeValue(value: TValue[]): void {
		this.value = value;
	}

	/** @inheritdoc */
	public registerOnChange<T extends ChangeFunction<TValue>>(fn: T): void {
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
