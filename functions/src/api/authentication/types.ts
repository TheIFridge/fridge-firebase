interface SignUpData {
	username: string;
    first_name: string;
    last_name: string;
	password: string;
	confirmPassword: string;
	email: string;
}

interface SignUpError {
	username?: string;
    first_name?: string;
    last_name?: string;
	password?: string;
	confirmPassword?: string;
	email?: string;
}

interface SignupValidatorOutput {
    errors: SignUpError;
    valid: boolean;
}

interface LoginData {
    email: string;
    password: string;
}

interface LoginError {
    email?: string;
    password?: string;
}

interface LoginValidatorOutput {
    errors: LoginError;
    valid: boolean;
}