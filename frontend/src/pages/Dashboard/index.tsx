import NavOnlyLayout from '@/layouts/NavOnlyLayout';
import AccountWrapper from './components/AccountWrapper';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
	return (
		<NavOnlyLayout>
			<div className="grid grid-cols-1 gap-4">
				<AccountWrapper />
				<QuickActions />
			</div>
		</NavOnlyLayout>
	);
};

export default Dashboard;
