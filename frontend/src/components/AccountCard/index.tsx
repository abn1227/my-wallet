import { Wallet } from 'lucide-react';

interface AccountCardProps {
	balance?: number;
	currency?: string;
	name?: string;
	backgroundColor?: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
	balance = 0,
	currency = 'USD',
	name = 'My Account',
	backgroundColor = '#fff',
}) => {
	return (
		<div className="card shadow-md w-100 h-32" style={{ backgroundColor }}>
			<div className="card-body">
				<div className="card-title">
					<Wallet />
					{name}
				</div>
				<p className="text-left">
					{currency} <span className="text-xl font-bold">{balance}</span>
				</p>
			</div>
		</div>
	);
};

export default AccountCard;
