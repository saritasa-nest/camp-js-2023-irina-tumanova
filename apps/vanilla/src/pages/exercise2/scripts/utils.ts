import { IResultElementHtml } from './types';

/**
 * Generate random number.
 * @param min - Minimal number.
 * @param max - Maximum number.
 */
export function generateRandomNumber(min: number, max: number): number {
	const rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

/**
 * Create html result block.
 * @param parent - Parent element.
 * @param name - Result name.
 * @param className - Result element class name.
 */
export function createResultElementHtml(parent: Element, name: string, className?: string): IResultElementHtml {

	// Result-item: Info
	const resultName = document.createElement('p');
	resultName.className = 'result-item__player-name typography-subtitle';
	resultName.textContent = name;

	const resultScore = document.createElement('p');
	resultScore.className = 'result-item__player-points typography-subtitle';
	resultScore.textContent = '0 points';

	const resultInfo = document.createElement('div');
	resultInfo.className = 'result-item__player-info';

	resultInfo.appendChild(resultName);
	resultInfo.appendChild(resultScore);

	// Result-item: Indicator
	const resultIndicator = document.createElement('div');
	resultIndicator.className = 'result_item__indicator';

	// Result-item: Moves
	const resultMovesTitle = document.createElement('p');
	resultMovesTitle.className = 'result_item__moves-subtitle typography-subtitle';
	resultMovesTitle.textContent = 'Moves';

	const resultMovesData = document.createElement('p');
	resultMovesData.className = 'result-item__moves-data typography-body';

	const resultMoves = document.createElement('div');
	resultMoves.className = 'result-item__moves';

	resultMoves.appendChild(resultMovesTitle);
	resultMoves.appendChild(resultMovesData);

	// Result-item: root
	const result = document.createElement('div');
	result.className = `blackjack__result-item result-item ${className ?? ''}`;

	result.appendChild(resultInfo);
	result.appendChild(resultIndicator);
	result.appendChild(resultMoves);

	parent.appendChild(result);

	return {
		resultHtml: result,
		resultMovesDataHtml: resultMovesData,
		resultScoreHtml: resultScore,
	};
}
