const SimpleLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<div className="min-h-screen">
			<main className="container mx-auto px-4 py-8">{children}</main>
		</div>
	);
};

export default SimpleLayout;
