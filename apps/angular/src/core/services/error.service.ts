import { Injectable } from '@angular/core';
import { HttpError } from '@js-camp/core/models/http-error';
import { HttpErrorMapper } from '@js-camp/core/mappers/http-error.mapper';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorDto } from '@js-camp/core/dtos/http-error.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class ErrorService {

	/**
	 * Get errors.
	 * @param error Http error.
	 */
	public getErrors(error: unknown): HttpError[] {
		if (error instanceof HttpErrorResponse && error.error.errors instanceof Array) {
			return error.error.errors.map((errorDto: unknown) => HttpErrorMapper.fromDto(errorDto as HttpErrorDto));
		}
		return [];
	}

	/**
	 * Show error in form.
	 * @param errors Errors.
	 * @param form Form.
	 */
	public showErrorsToForm(errors: HttpError[], form: FormGroup): void {
		errors.forEach(error => {
			if (error.attr !== null && error.attr in form.controls) {
				form.controls[error.attr].setErrors({ ...form.controls[error.attr].errors, [error.code]: error.detail });
			}
		});
	}
}
