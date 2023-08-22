import { memo } from 'react';

/**
 * Typed 'memo' to provide generic types for components.
 * Due to the use of React.memo, the typing of the component breaks.
 * See this issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087.
 */
export const typedMemo: <T>(component: T) => T = memo;
