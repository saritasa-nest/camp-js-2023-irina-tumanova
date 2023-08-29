import { xml2js } from 'xml-js';

import { S3UploadRequestDto } from '@js-camp/core/dtos/s3-upload-request.dto';

import { ApiUrlsConfig } from '../apiUrlsConfig';
import { http, s3Http } from '..';

interface S3PostData {

	/** Request URL. */
	readonly formAction: string;

	/** Form data for request. */
	readonly formData: FormData;
}

interface S3Response {

	/** S3 post response. */
	readonly PostResponse: {

		/** Image URL location object. */
		readonly Location: {

			/** Image URL. */
			readonly _text: string;
		};
	};
}

interface SaveImageProps {

	/** Image file. */
	readonly imageFile: File;

	/** Image name. */
	readonly imageName: string;

	/** Image dest. */
	readonly imageDest: 'anime_images' | 'user_avatars';
}

export namespace S3Service {

	/** Save image. */
	export async function saveImage({ imageDest, imageFile, imageName }: SaveImageProps): Promise<string> {
		const url = ApiUrlsConfig.s3.getParams;

		const { data: s3Request } = await http.post<S3UploadRequestDto>(url, {
			dest: imageDest,
			filename: imageName,
		});

		const { formAction, formData } = createS3PostData(s3Request, imageFile);
		const { data: s3Response } = await s3Http.post(formAction, formData);

		const response = xml2js(s3Response, { compact: true }) as S3Response;
		return response.PostResponse.Location._text;
	}

	/**
	 * Create S3 post data.
	 * @param s3Request Data for s3 request.
	 * @param imageFile Image file.
	 */
	function createS3PostData(s3Request: S3UploadRequestDto, imageFile: File): S3PostData {
		const s3UploadRequestFormData = new FormData();
		Object.keys(s3Request).forEach(s3DataKey =>
			s3UploadRequestFormData.append(s3DataKey, s3Request[s3DataKey as keyof S3UploadRequestDto]));
		s3UploadRequestFormData.append('file', imageFile);
		s3UploadRequestFormData.delete('form_action');
		return { formAction: s3Request.form_action, formData: s3UploadRequestFormData };
	}
}
