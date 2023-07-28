import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Modal data for display. */
interface ModalData {

	/** Modal title. */
	readonly title: string;

	/** Modal image url. */
	readonly imageUrl: string;
}

/** Image modal component. */
@Component({
	selector: 'camp-image-modal',
	templateUrl: 'image-modal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageModalComponent {

	/** Modal data. */
	protected readonly data = inject<ModalData>(MAT_DIALOG_DATA);
}
