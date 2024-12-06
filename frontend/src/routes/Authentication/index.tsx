import Authentication from '@/pages/Authentication';

export const AuthenticationRoutes = [
	{
		path: '/register',
		element: <Authentication type="register" />,
	},
	{
		path: '/login',
		element: <Authentication type="login" />,
	},
];
