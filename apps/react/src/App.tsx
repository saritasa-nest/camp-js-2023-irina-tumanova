import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { AppHeader } from './components/AppHeader';
import './theme';
import classes from './App.module.css';

export const App: FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Suspense fallback={<div>Brrr... here should be your loader component</div>}>
				<AppHeader />
				<main className={`${classes.main}`}>
					<RootRouter />
				</main>
			</Suspense>
		</BrowserRouter>
	</Provider>
);
