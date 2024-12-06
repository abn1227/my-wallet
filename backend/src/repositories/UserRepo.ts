import { IUser, User } from '@/models/User';

export class UserRepo {
	async create(data: Partial<IUser>): Promise<IUser> {
		const user = new User(data);

		return user.save();
	}

	async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
		return await User.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id: string): Promise<boolean> {
		const result = await User.findByIdAndDelete(id);

		return !!result;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return await User.findOne({ email });
	}

	async findById(id: string): Promise<IUser | null> {
		return await User.findById(id);
	}

	async findAll(): Promise<IUser[]> {
		return await User.find();
	}
}
