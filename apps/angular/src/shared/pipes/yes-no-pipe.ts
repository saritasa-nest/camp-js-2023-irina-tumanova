import { Pipe, PipeTransform } from '@angular/core';

/** Transform boolean to yes/no.*/
@Pipe({
	name: 'yesNoPipe',
	pure: false,
})
export class YesNoPipe implements PipeTransform {

	/** @inheritdoc */
	public transform(value: boolean): string {
		return value ? 'Yes' : 'No';
	}
}
