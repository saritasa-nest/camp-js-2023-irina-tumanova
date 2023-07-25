/**
 * A type that converts the passed type T to the type of the query parameter.
 * Type T can have fields with any value .
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryParamsOf<T extends Record<string, any>> = { [key in keyof Partial<T>]: string | undefined };
