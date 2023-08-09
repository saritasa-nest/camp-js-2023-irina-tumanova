import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';

import { BaseMatFormField } from '../base-mat-form-field/base-mat-form-field.component';

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
export class UploadImageComponent extends BaseMatFormField<FileControlValue> {

	/** Image url. */
	protected readonly imageUrl$ = new BehaviorSubject<string | null>(null);

	/**
	 * Image max size.
	 * Default image size 250 kB (not a lot, not a little).
	 */
	@Input()
	public maxSize = 1024 * 250;

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

	/** @inheritdoc */
	public override set value(value: FileControlValue) {
		this.setImageUrl(value);

		this._value = value;
		this.onChange(value);
		this.stateChanges.next();
	}

	/** @inheritdoc */
	public override controlType = 'upload-image';

	/** @inheritdoc */
	protected checkValueIsEmpty(value: FileControlValue): boolean {
		return value === null && this.defaultImageUrl === null;
	}

	private setImageUrl(value: string | null | File): void {
		this.imageUrl$.next(value instanceof File ? URL.createObjectURL(value) : value);
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
}
