import AccountCard from '@/components/AccountCard';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const MockAccounts = [
	{
		balance: 1000,
		currency: 'USD',
		name: 'Cash',
		backgroundColor: '#027d8a',
	},
	{
		balance: 1000,
		currency: 'USD',
		name: 'Bank Account',
		backgroundColor: '#027d8a',
	},
	{
		balance: 1000,
		currency: 'USD',
		name: 'Credit Card',
		backgroundColor: '#027d8a',
	},
];

const AccountWrapper: React.FC = () => {
	const [accounts, setAccounts] = useState(MockAccounts);

	const addAccount = () => {
		const newAccount = {
			balance: 0,
			currency: 'USD',
			name: 'New Account',
			backgroundColor: '#027d8a',
		};
		setAccounts([...accounts, newAccount]);
	};

	const renderAccounts = () => {
		return accounts.map((account, index) => (
			<AccountCard
				key={index}
				balance={account.balance}
				currency={account.currency}
				name={account.name}
				backgroundColor={account.backgroundColor}
			/>
		));
	};
	return (
		<div className="card bg-base-200 p-4 shadow-xl">
			<div className="card-title p-4">Accounts</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-h-80 overflow-y-auto card bg-base-300 shadow-xl">
				{renderAccounts()}
				<button className="btn btn-primary h-32 text-xl" onClick={addAccount}>
					<Plus />
					Add Account
				</button>
			</div>
		</div>
	);
};

export default AccountWrapper;
