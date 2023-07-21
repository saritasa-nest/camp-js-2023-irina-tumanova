/** Date range. */
export class DateRange {

	/** Start date. */
	public readonly start: Date;

	/** End date. */
	public readonly end: Date;

	public constructor({ start, end }: InitDateRangeParams) {
		this.start = start;
		this.end = end;
	}
}

type InitDateRangeParams = DateRange;
