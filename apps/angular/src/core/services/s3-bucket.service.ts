import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable, switchMap } from 'rxjs';

import { xml2js } from 'xml-js';

import { S3UploadDto } from '@js-camp/core/dtos/s3-upload.dto';

import { ApiUrlsConfig } from './api-urls.config';

interface S3PostData {

	/** Request Url. */
	readonly formAction: string;

	/** Form data for the request. */
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

/** Navigate service. */
@Injectable({
	providedIn: 'root',
})
export class S3Service {

	private readonly http = inject(HttpClient);

	private readonly apiUrlsConfig = inject(ApiUrlsConfig);

	/**
	 * Save anime image.
	 * @param image Image file object.
	 * @param imageLocalUrl Image local URL.
	 * @param imageDest Image dest.
	 */
	public saveImage(image: File, imageLocalUrl: string, imageDest: 'anime_images' | 'user_avatars'): Observable<string> {
		const url = this.apiUrlsConfig.s3.getParams;

		return this.http.post<S3UploadDto>(url, {
			dest: imageDest,
			filename: imageLocalUrl,
		}).pipe(
			map(s3DirectUpload => this.createS3PostData(s3DirectUpload, image)),
			switchMap(({ formAction, formData }) =>
				this.http.post(formAction, formData, { responseType: 'text' })),
			map(s3Response => xml2js(s3Response, { compact: true }) as S3Response),
			map(s3ResponseDto => s3ResponseDto.PostResponse.Location._text),
		);
	}

	private createS3PostData(s3UploadData: S3UploadDto, imageFile: File): S3PostData {
		const s3UploadFormData = new FormData();
		Object.keys(s3UploadData).forEach(s3DataKey => s3UploadFormData.append(s3DataKey, s3UploadData[s3DataKey as keyof S3UploadDto]));
		s3UploadFormData.append('file', imageFile);
		s3UploadFormData.delete('form_action');
		return { formAction: s3UploadData.form_action, formData: s3UploadFormData };
	}
}
