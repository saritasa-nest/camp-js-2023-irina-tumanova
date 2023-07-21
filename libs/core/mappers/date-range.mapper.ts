import { DateRangeDto } from '../dtos/date-range.dto';
import { DateRange } from '../models/date-range';

export namespace DateRangeMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Date range DTO.
	 */
	export function fromDto(dto: DateRangeDto): DateRange {
		return new DateRange({
			start: new Date(dto.start),
			end: new Date(dto.end),
		});
	}
}
