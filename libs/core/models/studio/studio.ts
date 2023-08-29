import { Immerable, OmitImmerable } from '../immerable';

/** Anime studio. */
export class Studio extends Immerable {

	/** ID. */
	public readonly id: number;

	/** Name. */
	public readonly name: string;

	public constructor({ id, name }: StudioConstructorData) {
		super();
		this.id = id;
		this.name = name;
	}
}

type StudioConstructorData = OmitImmerable<Studio>;
