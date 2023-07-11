import { DiceGenerator } from './DiceGenerator';
import { TurnGenerator } from './TurnGenerator';
import { Game } from './Game';
import { UIScoreDisplayer } from './UIScoreDisplayer';
import { Player } from './Player';

/** Game controller. */
export class GameController {

	private turnGenerator: TurnGenerator;

	private diceGenerator: DiceGenerator;

	private playerIds: number[] = [];

	private lastPlayerId = 0;

	public constructor() {
		this.turnGenerator = new TurnGenerator();
		this.diceGenerator = new DiceGenerator();

		this.addGame();
		this.addPlayer('Computer');
		this.addPlayer('You');

		this.turnGenerator.subscribe(this.diceGenerator);

		this.listenTurn();
	}

	/** Function add player.
	 * @param playerName - Player's name for display.
	 */
	public addPlayer(playerName: string): void {
		this.lastPlayerId += 1;
		this.playerIds = [...this.playerIds, this.lastPlayerId];
		const player = new Player(this.lastPlayerId);
		const uiPlayerDisplayer = new UIScoreDisplayer(playerName);
		player.subscribe(uiPlayerDisplayer);

		this.diceGenerator.subscribe(player);
	}

	/** Function add game result. */
	public addGame(): void {
		const game = new Game();
		const uiGameScoreDisplayer = new UIScoreDisplayer('Dice');
		game.subscribe(uiGameScoreDisplayer);

		this.diceGenerator.subscribe(game);
	}

	/** Function listen click on turn button. */
	public listenTurn(): void {
		document.querySelector('.blackjack__turn_button')?.addEventListener('click', this.turnGenerator.turn);
	}
}
