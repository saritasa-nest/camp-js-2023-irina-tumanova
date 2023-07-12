import { ResultElementHtml } from './types';

/**
 * Generate random number.
 * @param min Minimal number.
 * @param max Maximum number.
 */
export function generateRandomNumber(min: number, max: number): number {
	const rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

/**
 * Create html result block.
 * @param parent Parent element.
 * @param name Result name.
 * @param className Result element class name.
 */
export function createResultElementHtml(parent: Element, name: string, className?: string): ResultElementHtml {

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

	// Result-item: Turns
	const resultTurnsTitle = document.createElement('p');
	resultTurnsTitle.className = 'result_item__moves-subtitle typography-subtitle';
	resultTurnsTitle.textContent = 'Moves';

	const resultTurnsData = document.createElement('p');
	resultTurnsData.className = 'result-item__moves-data typography-body';

	const resultTurns = document.createElement('div');
	resultTurns.className = 'result-item__moves';

	resultTurns.appendChild(resultTurnsTitle);
	resultTurns.appendChild(resultTurnsData);

	// Result-item: root
	const result = document.createElement('div');
	result.className = `blackjack__result-item result-item ${className ?? ''}`;

	result.appendChild(resultInfo);
	result.appendChild(resultIndicator);
	result.appendChild(resultTurns);

	parent.appendChild(result);

	return {
		resultHtml: result,
		resultTurnsDataHtml: resultTurnsData,
		resultScoreHtml: resultScore,
	};
}
