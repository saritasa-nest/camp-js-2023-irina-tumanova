/**
 * Converts two date to a range.
 * @param startDate Start date.
 * @param endDate End date.
 * @returns Return years range as a string.
 */
export function getYearsRange(startDate: Date | null, endDate: Date | null): string {
	const start = startDate ? startDate.getFullYear() : null;
	const end = endDate ? endDate.getFullYear() : null;

	if (start !== null && end !== null) {
		return `${start} - ${end}`;
	}

	if (start === null) {
		return `Unknown - ${end}`;
	}

	if (end === null) {
		return `${start}`;
	}

	return '';
}
