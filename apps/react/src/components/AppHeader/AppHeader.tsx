import { FC, memo } from 'react';
import { useUserState } from '@js-camp/react/hooks/useUserState';
import { AppNoAuthHeader } from './components/AppNoAuthHeader';
import { AppAuthHeader } from './components/AppAuthHeader';

/** App header component. */
const AppHeaderComponent: FC = () => {
	const { user } = useUserState();

	if(user === null){
		return <AppNoAuthHeader />;
	}
	return <AppAuthHeader user={user} />;
};

export const AppHeader = memo(AppHeaderComponent);
