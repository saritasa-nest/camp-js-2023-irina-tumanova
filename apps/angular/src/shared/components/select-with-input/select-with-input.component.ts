import { ChangeDetectionStrategy, Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { Observable, ReplaySubject, combineLatest, map, startWith } from 'rxjs';

/** Select with input component. */
@Component({
	selector: 'camp-select-with-input',
	templateUrl: './select-with-input.component.html',
	styleUrls: ['./select-with-input.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWithInputComponent<TItem, TValue> {

	private readonly formBuider = inject(NonNullableFormBuilder);

	/** Select control. */
	@Input({ required: true })
	public selectControl: FormControl<readonly TValue[]> = this.formBuider.control([]);

	/** Item key for get item value. */
	@Input({ required: true })
	public valueKey: keyof TItem | null = null;

	/** Item key for get item name. */
	@Input({ required: true })
	public nameKey: keyof TItem | null = null;

	/** Select control. */
	@Input({ required: true })
	public label = 'Items';

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
	protected filteredItems$: Observable<readonly TItem[]> | null = null;

	/** Select's input controller. */
	protected readonly inputControl: FormControl<string>;

	public constructor() {
		this.inputControl = this.formBuider.control('');
		this.filteredItems$ = this.createFilteredItemsStream();
	}

	private createFilteredItemsStream(): Observable<readonly TItem[]> | null {
		if (this.selectControl === null || this.items === null) {
			return null;
		}

		return combineLatest([
			this.items$,
			this.inputControl.valueChanges.pipe(startWith('')),
			this.selectControl.valueChanges.pipe(startWith(this.selectControl.getRawValue())),
		]).pipe(
			map(([items, search, selectedItems]) => this.filterItems(items, search, selectedItems)),
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
}
