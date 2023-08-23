import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import './theme';
import { AppShadowLoader } from './components/AppShadowLoader';
import { theme } from './config/muiConfig';

export const App: FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Suspense fallback={<AppShadowLoader />}>
					<RootRouter />
				</Suspense>
			</ThemeProvider>
		</BrowserRouter>
	</Provider>
);
