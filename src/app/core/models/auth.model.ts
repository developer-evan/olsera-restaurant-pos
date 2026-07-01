export type PlatformRole = 'super_admin';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  platformRole: PlatformRole | null;
  status: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface AuthSession {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AcceptInvitePayload {
  token: string;
  password: string;
  firstName: string;
  lastName: string;
}
