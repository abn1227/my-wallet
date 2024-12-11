import React from 'react';

import useTranslation from '@/hooks/useTranslation';

type BaseField = {
	label: string;
	name: string;
	required?: boolean;
	error?: string;
	disabled?: boolean;
};

type TextInputField = BaseField & {
	type: 'text' | 'email' | 'password' | 'number' | 'tel';
	value?: string | number;
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type SelectOption = {
	label: string | React.ReactNode;
	value: string;
	renderOption?: React.ReactNode;
};

type SelectField = BaseField & {
	type: 'select';
	options: SelectOption[];
	value?: string;
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	renderSelected?: (option: SelectOption) => React.ReactNode;
};

type MultiSelectField = BaseField & {
	type: 'multiselect';
	options: SelectOption[];
	value?: string[];
	placeholder?: string;
	onChange: (values: string[]) => void;
};

type CheckboxField = BaseField & {
	type: 'checkbox';
	checked?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type RadioField = BaseField & {
	type: 'radio';
	options: SelectOption[];
	value?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Field = TextInputField | SelectField | MultiSelectField | CheckboxField | RadioField;

interface Props {
	fields: Field[];
	submitLabel?: string;
	onSubmit: () => void;
	className?: string;
}

export const RenderedForm: React.FC<Props> = ({ fields, onSubmit, submitLabel, className }) => {
	const { t } = useTranslation({
		ns: ['common'],
	});

	const renderField = (field: Field) => {
		switch (field.type) {
			case 'select':
				if (field.options.some(opt => React.isValidElement(opt.renderOption) || opt.label)) {
					// Renderizamos un select personalizado cuando hay elementos React
					return (
						<div className="relative">
							<select
								name={field.name}
								className="select select-bordered w-full appearance-none"
								value={field.value || ''}
								onChange={field.onChange}
								required={field.required}
								disabled={field.disabled}
							>
								{field.placeholder && (
									<option value="" disabled>
										{field.placeholder}
									</option>
								)}
								{field.options.map(option => (
									<option key={option.value} value={option.value}>
										{typeof option.label === 'string' ? option.label : option.value}
									</option>
								))}
							</select>
							{/* Overlay personalizado para mostrar las opciones con elementos React */}
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8">
								{field.value &&
									field.options.map(option => {
										if (option.value === field.value) {
											return field.renderSelected ? (
												field.renderSelected(option)
											) : (
												<div key={option.value} className="flex items-center gap-2">
													{option.renderOption}
												</div>
											);
										}

										return null;
									})}
							</div>
						</div>
					);
				}

				// Fallback al select normal para opciones simples
				return (
					<select
						name={field.name}
						className={`select select-bordered w-full ${field.error ? 'select-error' : ''}`}
						value={field.value || ''}
						onChange={field.onChange}
						required={field.required}
						disabled={field.disabled}
					>
						{field.placeholder && (
							<option value="" disabled>
								{field.placeholder}
							</option>
						)}
						{field.options.map(option => (
							<option key={option.value} value={option.value}>
								{typeof option.label === 'string' ? option.label : option.value}
							</option>
						))}
					</select>
				);

			case 'multiselect':
				return (
					<div className="flex flex-wrap gap-2">
						{field.options.map(option => (
							<label key={option.value} className="cursor-pointer flex items-center gap-2">
								<input
									type="checkbox"
									className="checkbox"
									checked={field.value?.includes(option.value)}
									onChange={e => {
										const newValues = e.target.checked
											? [...(field.value || []), option.value]
											: (field.value || []).filter(v => v !== option.value);
										field.onChange(newValues);
									}}
									disabled={field.disabled}
								/>
								<span>{option.label}</span>
							</label>
						))}
					</div>
				);

			case 'checkbox':
				return (
					<input
						type="checkbox"
						name={field.name}
						className={`checkbox ${field.error ? 'checkbox-error' : ''}`}
						checked={field.checked}
						onChange={field.onChange}
						required={field.required}
						disabled={field.disabled}
					/>
				);

			case 'radio':
				return (
					<div className="flex gap-4">
						{field.options.map(option => (
							<label key={option.value} className="cursor-pointer flex items-center gap-2">
								<input
									type="radio"
									name={field.name}
									className={`radio ${field.error ? 'radio-error' : ''}`}
									value={option.value}
									checked={field.value === option.value}
									onChange={field.onChange}
									required={field.required}
									disabled={field.disabled}
								/>
								<span>{option.label}</span>
							</label>
						))}
					</div>
				);

			default:
				return (
					<input
						type={field.type}
						name={field.name}
						className={`input input-bordered w-full ${field.error ? 'input-error' : ''}`}
						value={field.value || ''}
						onChange={field.onChange}
						placeholder={field.placeholder}
						required={field.required}
						disabled={field.disabled}
					/>
				);
		}
	};

	return (
		<div className={`flex flex-col gap-4 p-4 ${className || ''}`}>
			{fields.map(field => (
				<div key={field.name} className="form-control">
					<label className="label">
						<span className="label-text">{field.label}</span>
						{!field.required && (
							<span className="label-text-alt italic text-neutral-400">
								{t('forms.optional')}
							</span>
						)}
					</label>
					{renderField(field)}
					{field.error && <p className="text-error text-sm mt-1">{field.error}</p>}
				</div>
			))}
			<div className="form-control mt-6">
				<button className="btn btn-primary" onClick={onSubmit} type="submit">
					{submitLabel || t('forms.submit')}
				</button>
			</div>
		</div>
	);
};
