/** Date range. */
export class DateRange {

	/** Start date. */
	public readonly start: Date | null;

	/** End date. */
	public readonly end: Date | null;

	public constructor({ start, end }: InitDateRangeParams) {
		this.start = start;
		this.end = end;
	}
}

type InitDateRangeParams = DateRange;
