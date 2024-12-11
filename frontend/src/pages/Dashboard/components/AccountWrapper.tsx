import { useState } from 'react';

import { Plus } from 'lucide-react';

import AccountModal from './AccountModal';

import AccountCard from '@/components/AccountCard';
import { useAccounts, useCreateAccount } from '@/hooks/services/useAccounts';
import useTranslation from '@/hooks/useTranslation';

const AccountWrapper: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: accounts = [], isLoading, error } = useAccounts();
	const { t } = useTranslation({
		ns: ['account'],
	});
	const createAccount = useCreateAccount();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const addAccount = () => {
		setIsModalOpen(true);
	};

	const renderAccounts = () => {
		return accounts.map((account, index) => (
			<AccountCard
				key={index}
				balance={account.balance}
				currency={account.currency}
				name={account.name}
				color={account.color}
				icon={account.icon}
			/>
		));
	};

	return (
		<div className="card bg-base-200 p-4 shadow-xl">
			<div className="card-title p-4">{t('accounts')}</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-h-80 overflow-y-auto card bg-base-300 shadow-xl">
				{renderAccounts()}
				<button className="btn btn-primary h-32 text-xl" onClick={addAccount}>
					<Plus />
					{t('addAccount')}
				</button>
			</div>

			<AccountModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={formData => {
					createAccount.mutate(formData);
					setIsModalOpen(false);
				}}
			/>
		</div>
	);
};

export default AccountWrapper;
