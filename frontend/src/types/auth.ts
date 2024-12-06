export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface LoggedInUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
}

export interface LoginResponse {
	user: LoggedInUser;
	token: string;
}

export interface RegisterResponse {
	user: LoggedInUser;
	token: string;
}
