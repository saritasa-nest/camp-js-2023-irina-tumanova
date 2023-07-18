import { DateRangeDto } from '../dtos/date-range.dto';
import { DateRange } from '../models/date-range';

export namespace DateRangeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Date range dto.
	 */
	export function fromDto(dto: DateRangeDto): DateRange {
		return {
			start: dto.start,
			end: dto.end,
		};
	}
}
