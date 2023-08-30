/** Anime studio DTO. */
export interface StudioDto {

	/** ID. */
	readonly id: number;

	/**
	 * Creation date.
	 * @example 2023-07-18T10:32:17.881Z.
	 */
	readonly created: string;

	/**
	 * Modification date.
	 * @example 2023-07-18T10:32:17.881Z
	 */
	readonly modified: string;

	/** Name. */
	readonly name: string;

	/** Image. */
	readonly image: string;
}
