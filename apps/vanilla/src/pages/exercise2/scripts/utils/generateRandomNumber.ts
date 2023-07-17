/**
 * Generate random number.
 * @param min Minimal number.
 * @param max Maximum number.
 */
export function generateRandomNumber(min: number, max: number): number {
	return Math.floor(min + Math.random() * (max + 1 - min));
}
