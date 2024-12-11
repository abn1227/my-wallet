/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreditCard, Landmark, PiggyBank, Smartphone, Wallet } from 'lucide-react';

import { CARD_COLORS } from '@/constants/colors';
import { Field } from '@/utils/renderForm';

export const getAccountFields = ({
	handleInputChange,
	formData,
	t,
}: {
	handleInputChange: (field: string, value: string) => void;
	formData: any;
	t: any;
}): Field[] => {
	return [
		{
			type: 'text',
			name: 'name',
			label: t('form.name'),
			value: formData.name,
			required: true,
			onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
				handleInputChange('name', event.target.value),
		},
		{
			type: 'number',
			name: 'balance',
			label: t('form.balance'),
			value: formData.balance,
			required: true,
			onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
				handleInputChange('balance', event.target.value),
		},
		{
			type: 'select',
			name: 'currency',
			label: t('form.currency'),
			value: formData.currency || 'USD',
			required: true,
			options: [
				{ label: 'USD', value: 'USD' },
				{ label: 'EUR', value: 'EUR' },
				{ label: 'HNL', value: 'HNL' },
			],
			onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
				handleInputChange('currency', event.target.value),
		},
		{
			type: 'select',
			name: 'color',
			label: t('form.color'),
			value: formData.color || CARD_COLORS.green.primary,
			required: true,
			options: [
				{
					label: t('form.colors.green'),
					value: CARD_COLORS.green.primary,
					renderOption: (
						<div
							className="badge badge-lg"
							style={{ backgroundColor: CARD_COLORS.green.primary }}
						></div>
					),
				},
				{
					label: t('form.colors.blue'),
					value: CARD_COLORS.blue.primary,
					renderOption: (
						<div
							className="badge badge-lg"
							style={{ backgroundColor: CARD_COLORS.blue.primary }}
						></div>
					),
				},
				{
					label: t('form.colors.purple'),
					value: CARD_COLORS.purple.primary,
					renderOption: (
						<div
							className="badge badge-lg"
							style={{ backgroundColor: CARD_COLORS.purple.primary }}
						></div>
					),
				},
				{
					label: t('form.colors.red'),
					value: CARD_COLORS.red.primary,
					renderOption: (
						<div
							className="badge badge-lg"
							style={{ backgroundColor: CARD_COLORS.red.primary }}
						></div>
					),
				},
				{
					label: t('form.colors.gold'),
					value: CARD_COLORS.gold.primary,
					renderOption: (
						<div
							className="badge badge-lg"
							style={{ backgroundColor: CARD_COLORS.gold.primary }}
						></div>
					),
				},
				{
					label: t('form.colors.gray'),
					value: CARD_COLORS.gray.primary,
					renderOption: (
						<div
							className="badge badge-lg"
							style={{ backgroundColor: CARD_COLORS.gray.primary }}
						></div>
					),
				},
			],
			onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
				handleInputChange('color', event.target.value),
		},
		{
			type: 'select',
			name: 'icon',
			label: t('form.accountType'),
			value: formData.icon || 'Wallet',
			required: true,
			options: [
				{
					label: t('form.accountTypes.wallet'),
					value: 'Wallet',
					renderOption: <Wallet />,
				},
				{
					label: t('form.accountTypes.bank'),
					value: 'Bank',
					renderOption: <Landmark />,
				},
				{
					label: t('form.accountTypes.creditCard'),
					value: 'CreditCard',
					renderOption: <CreditCard />,
				},
				{
					label: t('form.accountTypes.debitCard'),
					value: 'DebitCard',
					renderOption: <CreditCard />,
				},
				{
					label: t('form.accountTypes.savings'),
					value: 'Savings',
					renderOption: <PiggyBank />,
				},
				{
					label: t('form.accountTypes.electronicWallet'),
					value: 'ElectronicWallet',
					renderOption: <Smartphone />,
				},
			],
			onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
				handleInputChange('icon', event.target.value),
		},
	];
};
