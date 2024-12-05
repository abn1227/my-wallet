import Authentication from '@/pages/Authentication';

export const AuthenticationRoutes = [
	{
		path: '/',
		element: <Authentication />,
	},
	{
		path: '/register',
		element: <Authentication type="register" />,
	},
	{
		path: '/login',
		element: <Authentication type="login" />,
	},
];
