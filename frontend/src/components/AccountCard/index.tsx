import { CreditCard, Landmark, Pencil, PiggyBank, Smartphone, Trash, Wallet } from 'lucide-react';

import { useDeleteAccount } from '@/hooks/services/useAccounts';

interface AccountCardProps {
	balance?: number;
	currency?: string;
	name?: string;
	color?: string;
	icon?: string;
}

const getIcon = (icon: string) => {
	switch (icon) {
		case 'Wallet':
			return <Wallet />;
		case 'CreditCard':
		case 'DebitCard':
			return <CreditCard />;
		case 'Savings':
			return <PiggyBank />;
		case 'Bank':
			return <Landmark />;
		case 'ElectronicWallet':
			return <Smartphone />;
		default:
			return <Wallet />;
	}
};

const AccountCard: React.FC<AccountCardProps> = ({
	balance = 0,
	currency = 'USD',
	name = 'My Account',
	color: backgroundColor = '#fff',
	icon = 'Wallet',
}) => {
	const deleteAccount = useDeleteAccount();

	return (
		<div className="card shadow-md w-100 h-32" style={{ backgroundColor }}>
			<div className="card-body">
				<div className="card-title">
					{getIcon(icon)}
					{name}
				</div>
				<p className="text-left">
					{currency} <span className="text-xl font-bold">{balance}</span>
				</p>
				{/* update and delete buttons as icons*/}
				<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-error">
					<Trash size={16} />
				</button>
				<button className="btn btn-sm btn-circle btn-ghost absolute right-10 top-2">
					<Pencil size={16} />
				</button>
			</div>
		</div>
	);
};

export default AccountCard;
