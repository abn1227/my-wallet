import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';

export const DefaultRoutes = [
	{
		path: '/',
		element: <div>Home</div>,
	},
	{
		path: '/profile',
		element: (
			<ProtectedRoute>
				<div>Profile</div>
			</ProtectedRoute>
		),
	},
	{
		path: '/dashboard',
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
	},
];
