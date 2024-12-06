import { IAccount } from '@/models/Account';
import { AccontRepo } from '@/repositories/AccountRepo';

export class GetAccountQuery {
	constructor(public readonly id: string) {}
}

export class ListAccountsQuery {
	constructor(public readonly userId: string) {}
}

export class AccountQueryHandlers {
	private accountRepo: AccontRepo;

	constructor() {
		this.accountRepo = new AccontRepo();
	}

	async getAccount(query: GetAccountQuery): Promise<IAccount | null> {
		return await this.accountRepo.findById(query.id);
	}

	async listAccounts(): Promise<IAccount[]> {
		return await this.accountRepo.findAll();
	}
}
