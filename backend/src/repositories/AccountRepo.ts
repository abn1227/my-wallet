import { Account, IAccount } from '@/models/Account';

export class AccontRepo {
	async create(data: Partial<IAccount>): Promise<IAccount> {
		const account = new Account(data);

		return account.save();
	}

	async update(id: string, data: Partial<IAccount>): Promise<IAccount | null> {
		return await Account.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id: string): Promise<boolean> {
		const result = await Account.findByIdAndDelete(id);

		return !!result;
	}

	async findById(id: string): Promise<IAccount | null> {
		return await Account.findById(id);
	}

	async findAll(): Promise<IAccount[]> {
		return await Account.find();
	}

	async listByUserId(userId: string): Promise<IAccount[]> {
		return await Account.find({ userId });
	}
}
