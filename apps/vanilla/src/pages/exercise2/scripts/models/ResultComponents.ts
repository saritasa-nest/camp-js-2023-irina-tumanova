import { ResultComponent } from '../ui/ResultComponent';
import { ResultInfoComponent } from '../ui/ResultInfoComponent';
import { ResultStatusComponent } from '../ui/ResultStatusComponent';
import { ResultTurnsComponent } from '../ui/ResultTurnsComponent';

/**
 * Links to ui result's components.
 * This is needed for the component creation method that returns
 * component references for further processing.
 */
export interface ResultComponents {

	/** Result info component. */
	readonly resultInfoComponent: ResultInfoComponent;

	/** Result activity status component. */
	readonly resultStatusComponent: ResultStatusComponent;

	/** Result turns component. */
	readonly resultTurnsComponent: ResultTurnsComponent;

	/** Result component. */
	readonly resultComponent: ResultComponent;
}
