import { apiClient } from '../api/client';

import { Account, AccountResponse } from '@/types/account';

class AccountService {
	private static instance: AccountService;
	private readonly basePath = '/account';
	private constructor() {}

	public static getInstance(): AccountService {
		if (!AccountService.instance) {
			AccountService.instance = new AccountService();
		}

		return AccountService.instance;
	}

	async create(data: Account) {
		const uri = `${this.basePath}/`;

		const response = await apiClient.post<Account>(uri, data);

		return response;
	}

	async update(id: string, data: Partial<Account>) {
		const uri = `${this.basePath}/${id}`;

		const response = await apiClient.put<Account>(uri, data);

		return response;
	}

	async delete(id: string) {
		const uri = `${this.basePath}/${id}`;

		const response = await apiClient.delete(uri);

		return response;
	}

	async list() {
		const uri = `${this.basePath}/`;

		const response = await apiClient.get<AccountResponse[]>(uri);

		return response;
	}
}

export const accountService = AccountService.getInstance();
