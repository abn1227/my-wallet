import { hash } from 'bcryptjs';

import { LoginDto, RegisterDto } from '@/dtos/Auth';
import { AccontRepo } from '@/repositories/AccountRepo';
import { UserRepo } from '@/repositories/UserRepo';
import { AuthService } from '@/services/authService';
import { LoginResponse, RegisterResponse } from '@/types/auth';

export class LoginCommand {
	constructor(public readonly credentials: LoginDto) {}
}

export class RegisterCommand {
	constructor(public readonly credentials: RegisterDto) {}
}

export class AuthCommandHandlers {
	private userRepo: UserRepo;
	private acountRepo: AccontRepo;
	private authService: AuthService;

	constructor() {
		this.userRepo = new UserRepo();
		this.authService = new AuthService();
		this.acountRepo = new AccontRepo();
	}

	async login(command: LoginCommand): Promise<LoginResponse> {
		const { email, password } = command.credentials;
		const user = await this.userRepo.findByEmail(email);

		if (!user) throw new Error('User not found');

		const isValidPassword = await this.authService.validatePassword(user, password);

		if (!isValidPassword) throw new Error('Invalid password');

		const token = this.authService.generateToken({
			userId: user.id,
			email: user.email,
		});

		return {
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
			},
			token,
		};
	}

	async register(command: RegisterCommand): Promise<RegisterResponse> {
		const { firstName, lastName, email, password } = command.credentials;
		const user = await this.userRepo.findByEmail(email);

		if (user) throw new Error('User already exists');

		const hashedPassword = await hash(password, 10);
		const newUser = await this.userRepo.create({ firstName, lastName, email, password: hashedPassword });
		const token = this.authService.generateToken({
			userId: newUser.id,
			email: newUser.email,
		});

		// Create a default account
		await this.acountRepo.create({
			name: 'Cash',
			currency: 'USD',
			balance: 0,
			userId: newUser.id,
		});

		return {
			user: {
				id: newUser.id,
				email: newUser.email,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
			},
			token,
		};
	}
}
