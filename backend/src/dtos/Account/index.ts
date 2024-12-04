import { IsString, MinLength } from 'class-validator';

export class CreateAccountDto {
	@IsString()
	@MinLength(3)
	name: string;

	color?: string;

	icon?: string;

	balance?: number;
}

export class UpdateAccountDto {
	@IsString()
	@MinLength(3)
	name: string;

	color?: string;

	icon?: string;

	balance?: number;
}
