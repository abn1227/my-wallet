import useTranslation from '@/hooks/useTranslation';
import NavOnlyLayout from '@/layouts/NavOnlyLayout';
import { fieldValidator } from '@/utils/fieldValidator';
import { Fields, renderForm } from '@/utils/renderForm';
import { useState } from 'react';

interface AuthenticationProps {
	type?: 'login' | 'register';
}

const Authentication: React.FC<AuthenticationProps> = ({ type = 'login' }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	});

	const { t } = useTranslation({
		ns: ['auth', 'common'],
	});

	const onChangeText = (field: string, value: string) => {
		setFormData({
			...formData,
			[field]: value,
		});
	};

	const onSubmit = () => {
		const newErrors: any = {};

		for (const field in formData) {
			const fieldKey = field as keyof typeof formData;

			if (fieldKey === 'email')
				newErrors[fieldKey] = fieldValidator(formData[fieldKey], ['required', 'email'])[0] || '';

			if (fieldKey === 'password')
				newErrors[fieldKey] = fieldValidator(formData[fieldKey], ['required', 'password'])[0] || '';

			if (['firstName', 'lastName'].includes(fieldKey))
				newErrors[fieldKey] = fieldValidator(formData[fieldKey], ['required'])[0] || '';
		}

		if (type === 'login') {
			// TODO: login
			console.log(formData);
		}

		if (type === 'register') {
			// TODO: register
			console.log(formData);
		}

		setErrors(newErrors);
	};

	const getTranslationError = (error: string) => (error ? t(`common:${error}`) : '');

	const loginFields: Fields[] = [
		{
			label: t('email'),
			value: formData.email,
			error: getTranslationError(errors.email),
			required: true,
			type: 'email',
			onChange: e => onChangeText('email', e.target.value),
		},
		{
			label: t('password'),
			value: formData.password,
			error: getTranslationError(errors.password),
			required: true,
			type: 'password',
			onChange: e => onChangeText('password', e.target.value),
		},
	];
	const registerFields: Fields[] = [
		{
			label: t('firstName'),
			value: formData.firstName,
			error: getTranslationError(errors.firstName),
			required: true,
			type: 'text',
			onChange: e => onChangeText('firstName', e.target.value),
		},
		{
			label: t('lastName'),
			value: formData.lastName,
			error: getTranslationError(errors.lastName),
			required: true,
			type: 'text',
			onChange: e => onChangeText('lastName', e.target.value),
		},
		...loginFields,
	];
	return (
		<NavOnlyLayout>
			<div className="grid grid-cols-1">
				<div className="card bg-base-200 p-4 w-full xl:w-1/3 mx-auto">
					<h2 className="card-title p-4">{type === 'register' ? t('register') : t('login')}</h2>
					{renderForm(
						type === 'register'
							? { fields: registerFields, onSubmit, submitLabel: t('register') }
							: { fields: loginFields, onSubmit, submitLabel: t('login') },
					)}
					{type === 'register' && (
						<span className="text-sm p-4 text-center">
							{t('alreadyHaveAccount')}{' '}
							<a className="text-accent" href="/login">
								{t('login')}
							</a>
						</span>
					)}
					{type === 'login' && (
						<span className="text-sm p-4 text-center">
							{t('dontHaveAccount')}{' '}
							<a href="/register" className="text-accent">
								{t('register')}
							</a>
						</span>
					)}
				</div>
			</div>
		</NavOnlyLayout>
	);
};

export default Authentication;
