import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';

import App from './App.tsx';
import AuthProvider from './providers/AuthProvider.tsx';
import { persistor, store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<StrictMode>
				<AuthProvider>
					<App />
				</AuthProvider>
			</StrictMode>
		</PersistGate>
	</Provider>,
);
