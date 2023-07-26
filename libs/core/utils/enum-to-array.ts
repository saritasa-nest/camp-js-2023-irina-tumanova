type NonFunctional<T> = T extends Function ? never : T;

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function enumToArray<T extends Record<string, unknown>>(enumeration: T): readonly NonFunctional<T[keyof T]>[] {
	return Object.keys(enumeration)
		.filter(key => isNaN(Number(key)))
		.map(key => enumeration[key])
		.filter(
			(val): val is NonFunctional<T[keyof T]> =>
				typeof val === 'number' || typeof val === 'string',
		);
}
