import { DiceGeneratorObserver } from './DiceGeneratorObserver';
import { TurnGeneratorPublisher } from './TurnGeneratorPublisher';
import { DiceResultsSubscriber } from './DiceResultsSubscriber';
import { PlayerSubscriber } from './PlayerSubscriber';
import { ResultInfoComponent } from './ui/ResultInfoComponent';
import { ResultStatusComponent } from './ui/ResultStatusComponent';
import { ResultTurnsComponent } from './ui/ResultTurnsComponent';
import { ResultComponent } from './ui/ResultComponent';
import { players } from './data/players';
import { Player } from './models/Player';

/** Game controller. */
export class GameController {

	/** Turn generator. */
	private readonly turnGenerator = new TurnGeneratorPublisher();

	/** Dice generator. */
	private readonly diceGenerator = new DiceGeneratorObserver();

	/** Init game controller. */
	public init(): void {
		for (let i = 0; i < players.length; i++) {
			this.initPlayer({ ...players[i], index: i });
			this.turnGenerator.playersCount += 1;
		}

		this.initDiceResults();

		this.turnGenerator.subscribe(this.diceGenerator);
		this.listenTurn();
	}

	/**
	 * Init player.
	 * @param info Info about player.
	 */
	private initPlayer(info: Player): void {
		const resultInfoComponent = new ResultInfoComponent();
		resultInfoComponent.render(info.name);
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

		const player = new PlayerSubscriber(info);
		player.results.subscribe(resultInfoComponent);
		player.results.subscribe(resultsComponent);
		player.isActive.subscribe(resultStatusComponent);
		player.isWinner.subscribe(resultRootComponent);

		this.diceGenerator.subscribe(player);
	}

	/** Init dice result. */
	private initDiceResults(): void {
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

		const diceResults = new DiceResultsSubscriber();
		diceResults.results.subscribe(resultInfoComponent);
		diceResults.results.subscribe(resultTurnsComponent);

		this.diceGenerator.subscribe(diceResults);
	}

	/** Add a click listener on the turn button. */
	private listenTurn(): void {
		const turnButtonHtml = document.querySelector('.blackjack__turn-button');
		if (turnButtonHtml) {
			turnButtonHtml.addEventListener('click', () => {
				this.turnGenerator.turn();
			});
		}
	}
}
