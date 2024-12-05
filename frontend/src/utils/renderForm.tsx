export interface Fields {
	label: string;
	value: string;
	required: boolean;
	type: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface Props {
	fields: Fields[];
	submitLabel?: string;
	onSubmit: () => void;
}
export const renderForm = ({ fields, onSubmit, submitLabel }: Props) => {
	return (
		<div className="flex flex-col gap-4 p-4">
			{fields.map(field => (
				<div key={field.label} className="form-control">
					<label className="label">
						<span className="label-text">{field.label}</span>
					</label>
					<input
						type={field.type}
						placeholder={field.label}
						className="input input-bordered"
						required={field.required}
						onChange={field.onChange}
					/>
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
