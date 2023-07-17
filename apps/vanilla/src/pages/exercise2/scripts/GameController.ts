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
import { ResultComponents } from './models/ResultComponents';

/** Game controller. */
export class GameController {

	/** Turn generator. */
	private readonly turnGenerator = new TurnGeneratorPublisher();

	/** Dice generator. */
	private readonly diceGenerator = new DiceGeneratorObserver();

	/** Init game controller. */
	public init(): void {
		players.forEach((player, id) => this.initPlayer({ ...player, id }));
		this.turnGenerator.playersCount = players.length;

		this.initDiceResults();

		this.turnGenerator.subscribe(this.diceGenerator);
		this.listenTurn();
	}

	/**
	 * Init player.
	 * @param info Info about player.
	 */
	private initPlayer(info: Player): void {
		const components = this.createResultComponents(info.name);

		const player = new PlayerSubscriber(info);
		player.results.subscribe(components.resultInfoComponent);
		player.results.subscribe(components.resultTurnsComponent);
		player.isActive.subscribe(components.resultStatusComponent);
		player.isWinner.subscribe(components.resultComponent);

		this.diceGenerator.subscribe(player);
	}

	/** Init dice result. */
	private initDiceResults(): void {
		const components = this.createResultComponents('Dice', 'result-items_total-dices');

		const diceResults = new DiceResultsSubscriber();
		diceResults.results.subscribe(components.resultInfoComponent);
		diceResults.results.subscribe(components.resultTurnsComponent);

		this.diceGenerator.subscribe(diceResults);
	}

	/**
	 * Create result element.
	 * @param name Score name.
	 * @param className REsult component class name.
	 * @returns Returns component objects for subsequent subscription to data changes.
	 */
	private createResultComponents(name: string, className?: string): ResultComponents {
		const resultInfoComponent = new ResultInfoComponent();
		resultInfoComponent.render(name);
		const resultStatusComponent = new ResultStatusComponent();
		resultStatusComponent.render();
		const resultTurnsComponent = new ResultTurnsComponent();
		resultTurnsComponent.render();

		const resultComponent = new ResultComponent();
		resultComponent.render({
			resultInfo: resultInfoComponent.resultInfoElement,
			resultStatus: resultStatusComponent.resultStatusElement,
			resultTurns: resultTurnsComponent.resultTurnsElement,
			className,
		});

		return { resultComponent, resultInfoComponent, resultStatusComponent, resultTurnsComponent };
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
