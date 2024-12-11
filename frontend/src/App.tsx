import { I18nextProvider } from 'react-i18next';

import i18n from './locales/i18n';
import { QueryProvider } from './providers/QueryProvider';
import Router from './routes/router';

function App() {
	return (
		<QueryProvider>
			<I18nextProvider i18n={i18n}>
				<Router />
			</I18nextProvider>
		</QueryProvider>
	);
}

export default App;
