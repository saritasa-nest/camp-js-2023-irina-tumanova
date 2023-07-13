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
		this.addPlayerStatus('Player One');
		this.addPlayerStatus('Player Two');
		this.addGameStatus();

		this.turnGenerator.subscribe(this.diceGenerator);

		this.listenMove();
	}

	/**
	 * Add player status.
	 * @param playerName Player's name for display.
	 */
	public addPlayerStatus(playerName: string): void {
		const player = new Player(this.playersCount);

		const uiPlayerDisplayer = new ResultDisplayer(playerName);
		player.subscribe(uiPlayerDisplayer);

		this.diceGenerator.subscribe(player);

		this.playersCount += 1;
		this.turnGenerator.playersCount += 1;
	}

	/** Add game status. */
	public addGameStatus(): void {
		const game = new Game();

		const uiGameScoreDisplayer = new ResultDisplayer('Dice', 'game-result');
		game.subscribe(uiGameScoreDisplayer);

		this.diceGenerator.subscribe(game);
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
