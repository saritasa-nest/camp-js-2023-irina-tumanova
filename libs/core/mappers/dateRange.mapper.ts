import { DateRangeDto } from '../dtos/dateRangeDto';
import { DateRange } from '../models/dateRange';

export namespace DateRangeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Genre dto.
	 */
	export function fromDto(dto: DateRangeDto): DateRange {
		return {
			start: dto.start,
			end: dto.end,
		};
	}
}
