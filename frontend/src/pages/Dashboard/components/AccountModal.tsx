import { useState } from 'react';

import { CARD_COLORS } from '@/constants/colors';
import { getAccountFields } from '@/forms/accountCreation';
import useTranslation from '@/hooks/useTranslation';
import { Account } from '@/types/account';
import { Field, RenderedForm } from '@/utils/renderForm';

interface AccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (formData: Account) => void;
	initialData?: Partial<Account>;
}
const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onSubmit, initialData, onClose }) => {
	const [formData, setFormData] = useState(
		initialData || {
			name: '',
			balance: 0,
			currency: 'USD',
			color: CARD_COLORS.green.primary,
		},
	);

	const { t } = useTranslation({
		ns: ['account'],
	});

	const handleInputChange = (field: string, value: string) => {
		setFormData(prevData => ({ ...prevData, [field]: value }));
	};

	const handleFormSubmit = () => {
		onSubmit(formData as Account);
		onClose();
	};

	const accountFields: Field[] = getAccountFields({
		handleInputChange,
		formData,
		t,
	});

	return (
		<dialog id="account-modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
			<div className="modal-box">
				<h3 className="font-bold text-lg">{t('createAccount')}</h3>
				<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
					✕
				</button>
				<RenderedForm fields={accountFields} onSubmit={handleFormSubmit} />
			</div>
		</dialog>
	);
};

export default AccountModal;
