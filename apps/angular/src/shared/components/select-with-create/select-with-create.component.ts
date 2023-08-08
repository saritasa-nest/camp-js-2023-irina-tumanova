import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, ReplaySubject, combineLatest, map, startWith } from 'rxjs';

import { BaseMatFormField } from '../base-mat-form-field/base-mat-form-field.component';

/** Select with create component. */
@Component({
	selector: 'camp-select-with-create',
	templateUrl: './select-with-create.component.html',
	styleUrls: ['./select-with-create.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: SelectWithCreateComponent }],
})
export class SelectWithCreateComponent<TItem, TValue> extends BaseMatFormField<readonly TValue[]> {

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

	/** @inheritdoc */
	public override controlType = 'select-with-input';

	public constructor() {
		super();

		this.inputControl = this.formBuilder.control('');
		this.filteredItems$ = this.createFilteredItemsStream();
	}

	private createFilteredItemsStream(): Observable<readonly TItem[]> {
		return combineLatest([
			this.items$,
			this.inputControl.valueChanges.pipe(startWith('')),
		]).pipe(
			map(([items, search]) => this.filterItems(items, search, this.value ?? [])),
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

	/** @inheritdoc */
	protected checkValueIsEmpty(value: TValue[] | null): boolean {
		return value === null || value.length === 0;
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
}
