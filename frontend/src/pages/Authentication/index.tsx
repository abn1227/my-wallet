import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks/reduxHooks';
import useAuth from '@/hooks/useAuth';
import useTranslation from '@/hooks/useTranslation';
import NavOnlyLayout from '@/layouts/NavOnlyLayout';
import { fieldValidator } from '@/utils/fieldValidator';
import { Field, RenderedForm } from '@/utils/renderForm';

interface AuthenticationProps {
	type?: 'login' | 'register';
}

const Authentication: React.FC<AuthenticationProps> = ({ type = 'login' }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	});

	const [formErrors, setFormErrors] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	});

	const { user, token } = useAppSelector(state => state.auth);
	const { t } = useTranslation({ ns: ['auth', 'common'] });
	const { login, register, error: authError } = useAuth();

	useEffect(() => {
		if (authError) alert(authError);
	}, [authError]);

	if (user && token) {
		navigate('/dashboard');
	}

	const handleInputChange = (field: string, value: string) => {
		setFormData(prevData => ({ ...prevData, [field]: value }));
	};

	const validateFormData = () => {
		const errors: Record<keyof typeof formData, string> = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
		};

		Object.keys(formData).forEach(key => {
			const fieldKey = key as keyof typeof formData;

			if (fieldKey === 'email') {
				errors[fieldKey] = fieldValidator(formData[fieldKey], ['required', 'email'])[0] || '';
			}

			if (fieldKey === 'password') {
				errors[fieldKey] = fieldValidator(formData[fieldKey], ['required', 'password'])[0] || '';
			}

			if (['firstName', 'lastName'].includes(fieldKey) && type === 'register') {
				errors[fieldKey] = fieldValidator(formData[fieldKey], ['required'])[0] || '';
			}
		});

		setFormErrors(errors);

		return !Object.values(errors).some(error => error);
	};

	const handleFormSubmit = async () => {
		if (!validateFormData()) return;

		const credentials = {
			email: formData.email,
			password: formData.password,
		};

		if (type === 'login') {
			await login(credentials);
		} else if (type === 'register') {
			await register({ ...credentials, firstName: formData.firstName, lastName: formData.lastName });
		}
	};

	const translateError = (error: string) => (error ? t(`common:${error}`) : '');

	const loginFields: Field[] = [
		{
			label: t('email'),
			name: 'email',
			value: formData.email,
			error: translateError(formErrors.email),
			required: true,
			type: 'email',
			onChange: e => handleInputChange('email', e.target.value),
		},
		{
			label: t('password'),
			name: 'password',
			value: formData.password,
			error: translateError(formErrors.password),
			required: true,
			type: 'password',
			onChange: e => handleInputChange('password', e.target.value),
		},
	];

	const registerFields: Field[] = [
		{
			label: t('firstName'),
			name: 'firstName',
			value: formData.firstName,
			error: translateError(formErrors.firstName),
			required: true,
			type: 'text',
			onChange: e => handleInputChange('firstName', e.target.value),
		},
		{
			label: t('lastName'),
			name: 'lastName',
			value: formData.lastName,
			error: translateError(formErrors.lastName),
			required: true,
			type: 'text',
			onChange: e => handleInputChange('lastName', e.target.value),
		},
		...loginFields,
	];

	return (
		<NavOnlyLayout>
			<div className="grid grid-cols-1">
				<div className="card bg-base-200 p-4 w-full xl:w-1/3 mx-auto">
					<h2 className="card-title p-4">{t(type)}</h2>
					<RenderedForm
						fields={type == 'register' ? registerFields : loginFields}
						onSubmit={handleFormSubmit}
						submitLabel={t(type)}
					/>
					<span className="text-sm p-4 text-center">
						{type === 'register' ? t('alreadyHaveAccount') : t('dontHaveAccount')}{' '}
						<a className="text-accent" href={type === 'register' ? '/login' : '/register'}>
							{t(type === 'register' ? 'login' : 'register')}
						</a>
					</span>
				</div>
			</div>
		</NavOnlyLayout>
	);
};

export default Authentication;
