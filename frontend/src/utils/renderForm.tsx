import useTranslation from '@/hooks/useTranslation';

export interface Fields {
	label: string;
	value?: string;
	required?: boolean;
	type?: string;
	error?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface Props {
	fields: Fields[];
	submitLabel?: string;
	onSubmit: () => void;
}
export const renderForm = ({ fields, onSubmit, submitLabel }: Props) => {
	const { t } = useTranslation({
		ns: ['common'],
	});
	return (
		<div className="flex flex-col gap-4 p-4">
			{fields.map(field => (
				<div key={field.label} className="form-control">
					<label className="label">
						<span className="label-text">{field.label}</span>
						{!field.required && (
							<span className="label-text-alt italic text-neutral-400">
								{t('forms.optional')}
							</span>
						)}
					</label>
					<input
						type={field.type}
						className={`input input-bordered ${field.error ? 'input-error' : ''}`}
						required={field.required}
						onChange={field.onChange}
						value={field.value || ''}
					/>
					{field.error && <p className="text-error">{field.error}</p>}
				</div>
			))}
			<div className="form-control mt-6">
				<button className="btn btn-primary" onClick={onSubmit}>
					{submitLabel || 'Submit'}
				</button>
			</div>
		</div>
	);
};
