import { DateRangeDto } from '../dtos/date-range.dto';
import { DateRange } from '../models/date-range';

export namespace DateRangeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Date range dto.
	 */
	export function fromDto(dto: DateRangeDto): DateRange {
		return {
			start: dto.start !== null ? new Date(dto.start) : null,
			end: dto.end !== null ? new Date(dto.end) : null,
		};
	}
}
