import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from './locales/i18n';
import AuthProvider from './providers/AuthProvider';
import Router from './routes/router';
import { store } from './store/store';

function App() {
	return (
		<Provider store={store}>
			<AuthProvider>
				<I18nextProvider i18n={i18n}>
					<Router />
				</I18nextProvider>
			</AuthProvider>
		</Provider>
	);
}

export default App;
