import { AuthContext } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { login as loginUser, logout, register as registerUser } from '@/store/slices/authSlice';
import { LoginRequest, RegisterRequest } from '@/types/auth';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();
	const { user, token, loading, error } = useAppSelector(state => state.auth);
	const login = async (data: LoginRequest) => {
		await dispatch(loginUser(data));
	};

	const register = async (data: RegisterRequest) => {
		await dispatch(registerUser(data));
	};

	const handleLogut = () => {
		dispatch(logout());
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				loading,
				error,
				login,
				logout: handleLogut,
				register,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
