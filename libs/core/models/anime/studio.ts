/** Anime studio. */
export class Studio {

	/** ID. */
	public readonly id: number;

	/** Creation date.*/
	public readonly created: Date;

	/** Modification date. */
	public readonly modified: Date;

	/** Name. */
	public readonly name: string;

	public constructor({ id, created, modified, name }: InitStudioParams) {
		this.id = id;
		this.created = created;
		this.modified = modified;
		this.name = name;
	}
}

type InitStudioParams = Studio;
