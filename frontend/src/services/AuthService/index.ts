import { apiClient } from '../api/client';

import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth';

class AuthService {
	private static instance: AuthService;
	private readonly basePath = '/auth';

	private constructor() {}

	public static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}

		return AuthService.instance;
	}

	async login(data: LoginRequest) {
		const uri = `${this.basePath}/login`;
		const response = await apiClient.post<LoginResponse>(uri, data);

		return response;
	}

	async register(data: RegisterRequest) {
		const uri = `${this.basePath}/register`;
		const response = await apiClient.post<RegisterResponse>(uri, data);

		return response;
	}
}

export const authService = AuthService.getInstance();
