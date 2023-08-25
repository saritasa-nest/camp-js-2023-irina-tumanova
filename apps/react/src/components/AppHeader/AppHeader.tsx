import { FC } from 'react';

import { useUserState } from '@js-camp/react/hooks/useUserState';
import { typedMemo } from '@js-camp/react/utils/typedMemo';

import { AppNoAuthHeader } from './components/AppNoAuthHeader';
import { AppAuthHeader } from './components/AppAuthHeader';

/** App header component. */
const AppHeaderComponent: FC = () => {
	const { user } = useUserState();

	if (user === null) {
		return <AppNoAuthHeader />;
	}
	return <AppAuthHeader user={user} />;
};

export const AppHeader = typedMemo(AppHeaderComponent);
