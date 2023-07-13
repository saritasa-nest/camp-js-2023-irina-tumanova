import { DiceGenerator } from './DiceGenerator';
import { TurnGenerator } from './TurnGenerator';
import { DiceResults } from './DiceResults';
import { Player } from './Player';
import { ResultInfoComponent } from './UI-result-item/ResultInfoComponent';
import { ResultStatusComponent } from './UI-result-item/ResultStatusComponent';
import { ResultTurnsComponent } from './UI-result-item/ResultTurnsComponent';
import { ResultComponent } from './UI-result-item/ResultComponent';

/** Game controller. */
export class GameController {

	/** Turn generator. */
	private readonly turnGenerator: TurnGenerator;

	/** Dice generator. */
	private readonly diceGenerator: DiceGenerator;

	/** Players count. */
	private playersCount = 0;

	public constructor() {
		this.turnGenerator = new TurnGenerator();
		this.diceGenerator = new DiceGenerator();
	}

	/** Init game controller. */
	public init(): void {
		const playerFirst = this.initPlayer('Player First', 0);
		const playerSecond = this.initPlayer('Player Second', 1);
		const diceResults = this.initDiceResults();

		this.diceGenerator.subscribe(diceResults);
		this.diceGenerator.subscribe(playerFirst);
		this.diceGenerator.subscribe(playerSecond);

		this.turnGenerator.subscribe(this.diceGenerator);

		this.playersCount = 2;
		this.turnGenerator.playersCount = this.playersCount;

		this.listenTurn();
	}

	/**
	 * Init player.
	 * @param name Player's name.
	 * @param index Players's index.
	 */
	public initPlayer(name: string, index: number): Player {
		const resultInfoComponent = new ResultInfoComponent();
		resultInfoComponent.render(name);
		const resultStatusComponent = new ResultStatusComponent();
		resultStatusComponent.render();
		const resultsComponent = new ResultTurnsComponent();
		resultsComponent.render();
		const resultRootComponent = new ResultComponent();
		resultRootComponent.render({
			resultInfo: resultInfoComponent.resultInfoElement,
			resultStatus: resultStatusComponent.resultStatusElement,
			resultTurns: resultsComponent.resultsContainer,
		});

		const playerFirst = new Player(index);
		playerFirst.results.subscribe(resultInfoComponent);
		playerFirst.results.subscribe(resultsComponent);
		playerFirst.isActive.subscribe(resultStatusComponent);
		playerFirst.isWinner.subscribe(resultRootComponent);

		return playerFirst;
	}

	/** Init dice result. */
	public initDiceResults(): DiceResults {
		const resultInfoComponent = new ResultInfoComponent();
		resultInfoComponent.render('Dice');
		const resultTurnsComponent = new ResultTurnsComponent();
		resultTurnsComponent.render();
		const resultRootComponent = new ResultComponent();
		resultRootComponent.render({
			resultInfo: resultInfoComponent.resultInfoElement,
			resultStatus: null,
			resultTurns: resultTurnsComponent.resultsContainer,
			className: 'game-result',
		});

		const diceResults = new DiceResults();
		diceResults.results.subscribe(resultInfoComponent);
		diceResults.results.subscribe(resultTurnsComponent);

		return diceResults;
	}

	/** Add a click listener on the turn button. */
	public listenTurn(): void {
		const turnButtonHtml = document.querySelector('.blackjack__turn-button');
		if (turnButtonHtml) {
			turnButtonHtml.addEventListener('click', () => {
				this.turnGenerator.turn();
			});
		}
	}
}
