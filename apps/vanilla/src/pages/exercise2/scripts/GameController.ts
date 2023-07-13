import { DiceGenerator } from './DiceGenerator';
import { TurnGenerator } from './TurnGenerator';
import { Game } from './Game';
import { ResultDisplayer } from './ResultDisplayer';
import { Player } from './Player';

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
		const displayerPlayerFirst = new ResultDisplayer();
		displayerPlayerFirst.render('Player One');
		const playerFirst = new Player(0);
		playerFirst.subscribe(displayerPlayerFirst);

		const displayerPlayerSecond = new ResultDisplayer();
		displayerPlayerSecond.render('Player Second');
		const playerSecond = new Player(1);
		playerSecond.subscribe(displayerPlayerSecond);

		const displayerGameScore = new ResultDisplayer();
		displayerGameScore.render('Dice', 'game-result');
		const gameScore = new Game();
		gameScore.subscribe(displayerGameScore);

		this.diceGenerator.subscribe(gameScore);
		this.diceGenerator.subscribe(playerFirst);
		this.diceGenerator.subscribe(playerSecond);

		this.turnGenerator.subscribe(this.diceGenerator);

		this.playersCount = 2;
		this.turnGenerator.playersCount = this.playersCount;

		this.listenMove();
	}

	/** Add a click listener on the turn button. */
	public listenMove(): void {
		const turnButtonHtml = document.querySelector('.blackjack__turn-button');
		if (turnButtonHtml) {
			turnButtonHtml.addEventListener('click', () => {
				this.turnGenerator.turn();
			});
		}
	}
}
