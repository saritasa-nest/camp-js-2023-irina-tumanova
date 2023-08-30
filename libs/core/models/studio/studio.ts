import { Immerable, OmitImmerable } from '../immerable';

/** Anime studio. */
export class Studio extends Immerable {
	/** ID. */
	public readonly id: number;

	/** Name. */
	public readonly name: string;

	/** Creation date, e.g. "2023-08-17T03:11:37.172Z". */
	public readonly created: Date;

	/** Modification date, e.g. "2023-08-17T03:11:37.172Z". */
	public readonly modified: Date;

	/** Thumbnail image. */
	public readonly thumbnailImg: string;

	public constructor({ id, created, modified, name, thumbnailImg }: StudioConstructorData) {
		super();
		this.id = id;
		this.created = created;
		this.modified = modified;
		this.name = name;
		this.thumbnailImg = thumbnailImg;
	}
}

type StudioConstructorData = OmitImmerable<Studio>;
