export type AuthMode = "login" | "signup";

export type AuthSubmission = {
  mode: AuthMode;
  email: string;
  password: string;
  name?: string;
};

export type AuthResult = { ok: true } | { ok: false; message: string };

export interface AuthService {
  submit(input: AuthSubmission): Promise<AuthResult>;
}

class LocalAuthService implements AuthService {
  async submit(): Promise<AuthResult> {
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    return { ok: true };
  }
}

export const authService: AuthService = new LocalAuthService();
