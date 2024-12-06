import mongoose, { Document, Schema } from 'mongoose';

export enum RegisterType {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE',
}

export interface IRegister extends Document {
	accountId: string;
	amount: number;
	currency: string;
	type: RegisterType;
	beneficiary: string;
	category: string;
	note: string;
	tags: string[];
	date: Date;
	time: string;
}

const RegisterSchema = new Schema<IRegister>({
	accountId: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	beneficiary: {
		type: String,
		required: false,
	},
	category: {
		type: String,
		required: false,
	},
	note: {
		type: String,
		required: false,
	},
	tags: {
		type: [String],
		required: false,
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
});

export const Register = mongoose.model<IRegister>('Register', RegisterSchema);
