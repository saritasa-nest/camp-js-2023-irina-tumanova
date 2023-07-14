import { ResultComponent } from '../ui/ResultComponent';
import { ResultInfoComponent } from '../ui/ResultInfoComponent';
import { ResultStatusComponent } from '../ui/ResultStatusComponent';
import { ResultTurnsComponent } from '../ui/ResultTurnsComponent';

/** Result root component's props. */
export interface ResultComponents {

	/** Result info component component. */
	readonly resultInfoComponent: ResultInfoComponent;

	/** Result activity status component. */
	readonly resultStatusComponent: ResultStatusComponent;

	/** Result turns component. */
	readonly resultTurnsComponent: ResultTurnsComponent;

	/** Result component. */
	readonly resultComponent: ResultComponent;
}
