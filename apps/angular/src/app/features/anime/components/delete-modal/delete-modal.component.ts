import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ModalData {

	/** Delete. */
	readonly delete: () => void;

	/** Cancel. */
	readonly cancel: () => void;

	/** Deleted element name. */
	readonly name: string;
}

/** Image modal component. */
@Component({
	selector: 'camp-delete-modal',
	templateUrl: './delete-modal.component.html',
	styleUrls: ['./delete-modal.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent {

	/** Modal data. */
	protected readonly data = inject<ModalData>(MAT_DIALOG_DATA);
}
