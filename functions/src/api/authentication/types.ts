export interface SignUpData {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface SignUpError {
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}

export interface SignupValidatorOutput {
  errors: SignUpError;
  valid: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginError {
  email?: string;
  password?: string;
}

export interface LoginValidatorOutput {
  errors: LoginError;
  valid: boolean;
}
