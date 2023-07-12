import { DiceGenerator } from './DiceGenerator';
import { MoveGenerator } from './MoveGenerator';
import { GameStatus } from './GameStatus';
import { UIStatusDisplayer } from './UIStatusDisplayer';
import { PlayerStatus } from './PlayerStatus';

/** Game controller. */
export class GameController {

	private readonly moveGenerator: MoveGenerator;

	private readonly diceGenerator: DiceGenerator;

	private playerIds: number[] = [];

	private lastPlayerId = 0;

	public constructor() {
		this.moveGenerator = new MoveGenerator();
		this.diceGenerator = new DiceGenerator();

		this.addPlayerStatus('Computer');
		this.addPlayerStatus('You');
		this.addGameStatus();

		this.moveGenerator.subscribe(this.diceGenerator);

		this.listenMove();
	}

	/**
	 * Add player.
	 * @param playerName - Player's name for display.
	 */
	public addPlayerStatus(playerName: string): void {
		this.lastPlayerId += 1;
		this.playerIds = [...this.playerIds, this.lastPlayerId];
		const player = new PlayerStatus(this.lastPlayerId);
		const uiPlayerDisplayer = new UIStatusDisplayer(playerName);
		player.subscribe(uiPlayerDisplayer);

		this.diceGenerator.subscribe(player);
		this.moveGenerator.updatePlayers(this.playerIds);
	}

	/** Add game result. */
	public addGameStatus(): void {
		const game = new GameStatus();
		const uiGameScoreDisplayer = new UIStatusDisplayer('Dice', 'game-result');
		game.subscribe(uiGameScoreDisplayer);

		this.diceGenerator.subscribe(game);
	}

	/** Add a click listener on the move button. */
	public listenMove(): void {
		const turnButtonHtml = document.querySelector('.blackjack__turn-button');
		if (turnButtonHtml) {
			turnButtonHtml.addEventListener('click', this.moveGenerator.move);
		}
	}
}
