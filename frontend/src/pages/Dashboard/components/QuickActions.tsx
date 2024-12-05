const QuickActions = () => {
	return (
		<div className="card bg-base-200 p-4 shadow-xl">
			<div className="card-title p-4">Quick Actions</div>
			<div className="flex flex-wrap gap-4 p-4">
				<button className="btn btn-primary rounded-full">New Register</button>
				<button className="btn btn-primary rounded-full">Automatic Payments</button>
				<button className="btn btn-primary rounded-full">Transfer</button>
				<button className="btn btn-primary rounded-full">Debts</button>
			</div>
		</div>
	);
};

export default QuickActions;
