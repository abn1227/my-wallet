type constraints = 'required' | 'email' | 'password';

export const fieldValidator = (value: string, constraints: constraints[]) => {
	const errors = [];
	if (constraints.includes('required') && !value) {
		errors.push('validator.required');
	}
	if (constraints.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
		errors.push('validator.email');
	}
	if (
		constraints.includes('password') &&
		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
	) {
		errors.push('validator.password');
	}
	return errors;
};
