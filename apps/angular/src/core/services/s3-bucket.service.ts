import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { xml2js } from 'xml-js';
import { S3UploadRequestDto } from '@js-camp/core/dtos/s3-upload-request.dto';

import { ApiUrlsConfig } from './api-urls.config';

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

/** S3 service. */
@Injectable({
	providedIn: 'root',
})
export class S3Service {

	private readonly http = inject(HttpClient);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	/**
	 * Save image.
	 * @param imageFile Image file.
	 * @param imageLocalUrl Image local URL.
	 * @param imageDest Image dest.
	 */
	public saveImage(imageFile: File, imageLocalUrl: string, imageDest: 'anime_images' | 'user_avatars'): Observable<string> {
		const url = this.apiUrlsConfig.s3.getParams;

		return this.http.post<S3UploadRequestDto>(url, {
			dest: imageDest,
			filename: imageLocalUrl,
		}).pipe(
			map(s3Request => this.createS3PostData(s3Request, imageFile)),
			switchMap(({ formAction, formData }) => this.http.post(formAction, formData, { responseType: 'text' })),
			map(s3Response => xml2js(s3Response, { compact: true }) as S3Response),
			map(s3ResponseDto => s3ResponseDto.PostResponse.Location._text),
		);
	}

	private createS3PostData(s3Request: S3UploadRequestDto, imageFile: File): S3PostData {
		const s3UploadRequestFormData = new FormData();
		Object.keys(s3Request).forEach(s3DataKey =>
			s3UploadRequestFormData.append(s3DataKey, s3Request[s3DataKey as keyof S3UploadRequestDto]));
		s3UploadRequestFormData.append('file', imageFile);
		s3UploadRequestFormData.delete('form_action');
		return { formAction: s3Request.form_action, formData: s3UploadRequestFormData };
	}
}
