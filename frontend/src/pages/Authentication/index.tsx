import NavOnlyLayout from '@/layouts/NavOnlyLayout';
import { Fields, renderForm } from '@/utils/renderForm';

interface AuthenticationProps {
	type?: 'login' | 'register';
}

const loginFields: Fields[] = [
	{ label: 'Correo', value: '', required: true, type: 'email' },
	{ label: 'Contraseña', value: '', required: true, type: 'password' },
];
const registerFields: Fields[] = [
	{ label: 'Nombre', value: '', required: true, type: 'text' },
	{ label: 'Correo', value: '', required: true, type: 'email' },
	{ label: 'Contraseña', value: '', required: true, type: 'password' },
];
const Authentication: React.FC<AuthenticationProps> = ({ type = 'login' }) => {
	return (
		<NavOnlyLayout>
			<div className="grid grid-cols-1">
				<div className="card bg-base-200 p-4 w-full md:w-1/3 mx-auto">
					<h2 className="card-title p-4">
						{type === 'register' ? 'Registrarse' : 'Iniciar sesion'}
					</h2>
					{renderForm(
						type === 'register'
							? { fields: registerFields, onSubmit: () => {}, submitLabel: 'Registrarse' }
							: { fields: loginFields, onSubmit: () => {}, submitLabel: 'Iniciar sesion' },
					)}
					{type === 'register' && (
						<span className="text-sm p-4">
							Ya tienes una cuenta?{' '}
							<a className="text-accent" href="/login">
								Iniciar sesion
							</a>
						</span>
					)}
					{type === 'login' && (
						<span className="text-sm p-4">
							No tienes una cuenta?{' '}
							<a href="/register" className="text-accent">
								Registrarse
							</a>
						</span>
					)}
				</div>
			</div>
		</NavOnlyLayout>
	);
};

export default Authentication;
