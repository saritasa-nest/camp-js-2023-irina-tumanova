import { DiceGenerator } from './DiceGenerator';
import { TurnGenerator } from './TurnGenerator';
import { GameStatus } from './GameStatus';
import { UIStatusDisplayer } from './UIStatusDisplayer';
import { Player } from './Player';

/** Game controller. */
export class GameController {

	/** Turn generator. */
	private turnGenerator: TurnGenerator;

	/** Dice generator. */
	private diceGenerator: DiceGenerator;

	/** Players ids. */
	private playerIds: readonly number[] = [];

	/** Id of the last added player. */
	private lastPlayerId = 0;

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
		this.lastPlayerId += 1;
		this.playerIds = [...this.playerIds, this.lastPlayerId];
		const player = new Player(this.lastPlayerId);

		const uiPlayerDisplayer = new UIStatusDisplayer(playerName);
		player.subscribe(uiPlayerDisplayer);

		this.diceGenerator.subscribe(player);
		this.turnGenerator.updatePlayers(this.playerIds);
	}

	/** Add game status. */
	public addGameStatus(): void {
		const game = new GameStatus();

		const uiGameScoreDisplayer = new UIStatusDisplayer('Dice', 'game-result');
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
