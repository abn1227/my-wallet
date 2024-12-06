import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export const User = mongoose.model<IUser>('User', UserSchema);
