import { DateRangeDto } from '../dtos/date-range.dto';
import { DateRange } from '../models/date-range';

export namespace DateRangeMapper {

	/**
	 * Maps DTO to model.
	 * @param dto Date range DTO.
	 */
	export function fromDto(dto: DateRangeDto): DateRange {
		return new DateRange({
			start: dto.start !== null ? new Date(dto.start) : null,
			end: dto.end !== null ? new Date(dto.end) : null,
		});
	}

	/**
	 * Maps model to DTO.
	 * @param model Date range.
	 */
	export function toDto(model: DateRange): DateRangeDto {
		return {
			start: model.start !== null ? model.start.toISOString() : null,
			end: model.end !== null ? model.end.toISOString() : null,
		};
	}
}
