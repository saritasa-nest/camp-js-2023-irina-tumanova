/** S3 upload request DTO. */
export interface S3UploadRequestDto{

	/** Policy. */
	readonly 'policy': string;

	/** Action status. */
	readonly 'success_action_status': string;

	/** Amz credential. */
	readonly 'x-amz-credential': string;

	/** Amz date. */
	readonly 'x-amz-date': string;

	/** Amz signature. */
	readonly 'x-amz-signature': string;

	/** Amz algorithm. */
	readonly 'x-amz-algorithm': string;

	/** Form action. */
	readonly 'form_action': string;

	/** Key. */
	readonly 'key': string;

	/** Acl. */
	readonly 'acl': string;

	/** Amx security token. */
	readonly 'x-amz-security-token': string;

	/** Content type. */
	readonly 'content-type': string;

	/** Cache Control. */
	readonly 'Cache-Control': string;

	/** Content Disposition. */
	readonly 'Content-Disposition': string;
}
