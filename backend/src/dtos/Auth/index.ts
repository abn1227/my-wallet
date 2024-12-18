import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}

export class RegisterDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;

	@IsString()
	@MinLength(2)
	firstName: string;

	@IsString()
	@MinLength(2)
	lastName: string;
}
