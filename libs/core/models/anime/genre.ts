import { Immerable, OmitImmerable } from '../immerable';

/** Genre. */
export class Genre extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Name. */
	public readonly name: string;

	/** Creation date. */
	public readonly created: Date;

	/** Modification date. */
	public readonly modified: Date;

	/** Type. */
	public readonly type: GenreType;

	public constructor(data: GenreConstructorData) {
		super();
		this.id = data.id;
		this.name = data.name;
		this.created = data.created;
		this.modified = data.modified;
		this.type = data.type;
	}
}

/** Genre type. */
export enum GenreType {
	Genres = 'Genres',
	ExplicitGenres = 'ExplicitGenres',
	Themes = 'Themes',
	Demographics = 'Demographics',
}

type GenreConstructorData = OmitImmerable<Genre>;
