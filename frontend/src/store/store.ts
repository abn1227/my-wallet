import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { authPersistConfig } from './persist/authPersist';
import authReducer from './slices/authSlice';

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
	},

	middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
