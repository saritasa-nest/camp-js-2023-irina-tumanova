import { HttpErrorItemDto } from '../dtos/http-error.dto';

/**
 * Extract error message from error array.
 * @param attr Http error attr.
 * @param errors Http errors.
 */
export function extractErrorMessageFromArray(attr: string | null, errors: readonly HttpErrorItemDto[]): string | undefined {
	return errors.find(error => error.attr === attr)?.detail;
}
