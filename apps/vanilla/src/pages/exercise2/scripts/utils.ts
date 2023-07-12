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
	const resultHtml = document.createElement('div');
	resultHtml.className = `blackjack__result-item result-item ${className ?? ''}`;

	const resultInfoHtml = document.createElement('div');
	resultInfoHtml.className = 'result-item__player-info';

	const resultNameHtml = document.createElement('p');
	resultNameHtml.className = 'result-item__player-name typography-subtitle';
	resultNameHtml.textContent = name;

	const resultScoreHtml = document.createElement('p');
	resultScoreHtml.className = 'result-item__player-points typography-subtitle';
	resultScoreHtml.textContent = '0 points';

	resultInfoHtml.appendChild(resultNameHtml);
	resultInfoHtml.appendChild(resultScoreHtml);

	const resultIndicatorHtml = document.createElement('div');
	resultIndicatorHtml.className = 'result_item__indicator';

	const resultMovesHtml = document.createElement('div');
	resultMovesHtml.className = 'result-item__moves';

	const resultMovesTitle = document.createElement('p');
	resultMovesTitle.className = 'result_item__moves-subtitle typography-subtitle';
	resultMovesTitle.textContent = 'Moves';

	const resultMovesDataHtml = document.createElement('div');
	resultMovesDataHtml.className = 'result-item__moves-data typography-body';

	resultMovesHtml.appendChild(resultMovesTitle);
	resultMovesHtml.appendChild(resultMovesDataHtml);

	resultHtml.appendChild(resultInfoHtml);
	resultHtml.appendChild(resultIndicatorHtml);
	resultHtml.appendChild(resultMovesHtml);

	parent.appendChild(resultHtml);

	return {
		resultHtml, resultMovesDataHtml, resultScoreHtml,
	};
}
