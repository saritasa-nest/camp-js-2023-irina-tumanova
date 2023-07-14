import { Player } from '../models/Player';

export const players: Omit<Player, 'index'>[] = [
	{ name: 'Player First' },
	{ name: 'Player Second' },
];
