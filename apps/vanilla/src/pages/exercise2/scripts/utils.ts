/**
 * Generate random number.
 * @param min Minimal number.
 * @param max Maximum number.
 */
export function generateRandomNumber(min: number, max: number): number {
	const rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}
