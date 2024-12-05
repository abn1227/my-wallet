import { Navbar } from '@/components/ui';

const NavOnlyLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow container mx-auto px-4 py-8">{children}</main>
		</div>
	);
};

export default NavOnlyLayout;
