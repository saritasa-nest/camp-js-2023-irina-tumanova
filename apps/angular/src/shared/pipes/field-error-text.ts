import { Pipe, PipeTransform } from '@angular/core';

import { AppErrorConfig } from '@js-camp/core/models/app-error-config';

/** Transform error code to error text. */
@Pipe({
	name: 'fieldErrorText',
	pure: false,
})
export class FieldErrorTextPipe implements PipeTransform {

	/** @inheritdoc */
	public transform(code: string, field = ''): string {
		return AppErrorConfig.toReadableAppError(code as AppErrorConfig.AppErrorCode, field);
	}
}
