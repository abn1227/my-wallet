export interface Account {
	name: string;
	balance: number;
	currency: string;
	color: string;
	icon: string;
}

export interface AccountResponse extends Account {
	id: string;
}
