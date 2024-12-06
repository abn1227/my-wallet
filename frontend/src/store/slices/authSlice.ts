import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '@/services/AuthService';
import { LoggedInUser, LoginRequest, RegisterRequest } from '@/types/auth';

interface AuthState {
	user: LoggedInUser;
	token: string;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: {} as LoggedInUser,
	token: '',
	loading: false,
	error: null,
};

export const login = createAsyncThunk(
	'auth/login',
	async (credentials: LoginRequest, { rejectWithValue }) => {
		try {
			const response = await authService.login(credentials);

			return response.data;
		} catch (error) {
			console.debug(error);

			return rejectWithValue((error as Error)?.message || 'Invalid email or password');
		}
	},
);

export const register = createAsyncThunk(
	'auth/register',
	async (credentials: RegisterRequest, { rejectWithValue }) => {
		try {
			const response = await authService.register(credentials);

			return response.data;
		} catch (error) {
			console.debug(error);

			return rejectWithValue((error as Error)?.message || 'Invalid email or password');
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = {} as LoggedInUser;
			state.token = '';
			state.loading = false;
			state.error = null;
		},

		setCredentials: (state, action) => {
			const { user, token } = action.payload;

			state.user = user;
			state.token = token;
		},
	},

	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(register.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
