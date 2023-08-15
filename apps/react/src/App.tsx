import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { AppHeader } from './components/AppHeader';
import './theme';
import classes from './App.module.css';
import { AppShadowLoader } from './components/AppShadowLoader';

export const App: FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Suspense fallback={<AppShadowLoader />}>
				<AppHeader />
				<div id='app-shadow-loader-root'></div>
				<main className={classes.main}>
					<RootRouter />
				</main>
			</Suspense>
		</BrowserRouter>
	</Provider>
);
