import { createContext } from 'react';

import { LoggedInUser, LoginRequest, RegisterRequest } from '@/types/auth';

interface AuthContextProps {
	user: LoggedInUser;
	token: string;
	loading: boolean;
	login: (data: LoginRequest) => Promise<void>;
	logout: () => void;
	register: (data: RegisterRequest) => Promise<void>;
	error: string | null;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
