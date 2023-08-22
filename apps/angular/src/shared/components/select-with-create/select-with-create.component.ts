import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { DefaultListParams } from '@js-camp/core/models/list-params';
import { Pagination } from '@js-camp/core/models/pagination';
import { Sorting } from '@js-camp/core/models/sorting';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';

import { BaseMatFormField } from '../base-mat-form-field/base-mat-form-field.component';

type GetItemsFunction<TItem> = (params: DefaultListParams<undefined>) => Observable<Pagination<TItem>>;

type CreateItemFunction<TItem> = (name: string) => Observable<TItem>;

type CheckAreEqualItems<TItem> = (first: TItem, second: TItem) => boolean;

const DEFAULT_LIST_PARAMS: DefaultListParams<undefined> = {
	sorting: new Sorting({ field: undefined, direction: '' }),
	filters: { search: '' },
	pagination: new PaginationParams({ pageNumber: 0, pageSize: 15 }),
};

/** Select with create component. */
@Component({
	selector: 'camp-select-with-create',
	templateUrl: './select-with-create.component.html',
	styleUrls: ['./select-with-create.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: SelectWithCreateComponent }],
})
export class SelectWithCreateComponent<TItem> extends BaseMatFormField<readonly TItem[]> implements OnInit {

	/** Get items. */
	@Input({ required: true })
	public getItems: GetItemsFunction<TItem> | null = null;

	/** Create item. */
	@Input({ required: true })
	public createItem: CreateItemFunction<TItem> | null = null;

	/** Key with item name. */
	@Input({ required: true })
	public nameKey: keyof TItem | null = null;

	/** Сompare item. */
	@Input({ required: true })
	public checkAreEqualItems: CheckAreEqualItems<TItem> | null = null;

	/** @inheritdoc */
	public override controlType = 'select-with-create';

	/** Separator keys codes. */
	protected readonly separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Items params. */
	protected readonly itemsParams$ = new BehaviorSubject(DEFAULT_LIST_PARAMS);

	/** Items. */
	protected items$ = new BehaviorSubject<TItem[]>([]);

	/** Select's input controller. */
	protected readonly inputControl: FormControl<string>;

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		super();
		this.inputControl = this.formBuilder.control('');
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.inputControl.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			tap(value => {
				this.items$.next([]);
				this.itemsParams$.next(new DefaultListParams({
					sorting: DEFAULT_LIST_PARAMS.sorting,
					pagination: DEFAULT_LIST_PARAMS.pagination,
					filters: { search: value },
				}));
			}),
			this.untilDestroyed(),
		).subscribe();

		this.itemsParams$.pipe(
			switchMap(params => this.getItems !== null ? this.mapPaginationToItems(this.getItems(params)) : of([])),
			withLatestFrom(this.items$),
			tap(([newItems, items]) => {
				this.items$.next(items.concat(newItems));
			}),
			this.untilDestroyed(),
		).subscribe();
	}

	private mapPaginationToItems(paginaionStream$: Observable<Pagination<TItem>>): Observable<readonly TItem[]> {
		return paginaionStream$.pipe(map(paginaion => paginaion.items));
	}

	/**
	 * Scroll.
	 * @param params Request params.
	 */
	protected scroll(params: DefaultListParams<undefined>): void {
		this.itemsParams$.next(new DefaultListParams({
			...params,
			pagination: new PaginationParams({ ...params.pagination, pageNumber: params.pagination.pageNumber + 1 }),
		}));
	}

	/** @inheritdoc */
	protected override checkValueIsEmpty(value: readonly TItem[] | null): boolean {
		return (value === null || value.length === 0) && this.inputControl.value.length === 0 ;
	}

	/**
	 * Handle create button click.
	 * @param event Event.
	 */
	protected handleCreateButtonClick(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		if (this.createItem === null || value.length === 0) {
			return;
		}

		this.createItem(value).pipe(
			tap(newItem => {
				this.formControl.patchValue([...(this.formControl.value ?? []), newItem]);
			}),
		)
			.subscribe();

		this.inputControl.setValue('');
	}

	/**
	 * Remove item.
	 * @param removedItem Removed item.
	 */
	protected remove(removedItem: TItem): void {
		if (this.formControl.value === null || this.checkAreEqualItems === null) {
			return;
		}
		const newItems = this.formControl.value.filter(item =>
			this.checkAreEqualItems !== null && !this.checkAreEqualItems(item, removedItem));
		this.formControl.patchValue(newItems);
	}

	/**
	 * Select item.
	 * @param event Event.
	 */
	protected selected(event: MatAutocompleteSelectedEvent): void {
		this.inputControl.setValue('');
		const selectedItem = event.option.value;

		if (this.checkAreEqualItems === null ||
			this.formControl.value?.find(item => this.checkAreEqualItems?.(item, selectedItem)) !== undefined) {
			return;
		}

		this.formControl.patchValue([...(this.formControl.value ?? []), selectedItem]);
	}
}
