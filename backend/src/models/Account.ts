import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
	name: string;
	color: string;
	icon: string;
	balance: number;
}

const AccountSchema = new Schema<IAccount>({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: false,
		default: '#000',
	},
	icon: {
		type: String,
		required: false,
		default: '',
	},
	balance: {
		type: Number,
		required: true,
		default: 0,
	},
});

export const Account = mongoose.model<IAccount>('Account', AccountSchema);
