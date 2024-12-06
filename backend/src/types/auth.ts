export interface TokenPayload {
	userId: string;
	email: string;
}

export interface LoginResponse {
	user: {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
	};
	token: string;
}

export interface RegisterResponse extends LoginResponse {}
