export interface AuthState {
  isAuthenticated: boolean;
  email: string;
  // error is set to boolean to create the error text also with translation
  error: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
}
