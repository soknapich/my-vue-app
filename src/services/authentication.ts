import Cookies from 'js-cookie';

// Define constants with types
const TokenKey: string = 'token';
const RefreshTokenKey: string = 'refresh_token';
const UserInfoKey: string = 'userInfo';
const domainName: string = import.meta.env.VITE_DOMAIN_NAME || 'localhost';

// Interface for cookie parameters
interface CookieParams {
  domain: string;
  cookieKey: string;
}

// Get token from cookies
export async function getToken(tokenKey?: string): Promise<string | undefined> {
  const TOKEN_KEY: string = tokenKey || TokenKey;
  return Cookies.get(TOKEN_KEY);
}

// Set token in cookies
export function setToken(tokenKey: string | undefined, token: string, expires: number = 30): string | undefined {
  const TOKEN_KEY: string = tokenKey || TokenKey;
  if (expires === 0) {
    return Cookies.set(TOKEN_KEY, token);
  }
  return Cookies.set(TOKEN_KEY, token, { expires, domain: domainName });
}

// Set user info in cookies
export function setUserInfoCookie(data: unknown): string | undefined {
  const serializedData: string = data ? JSON.stringify(data) : '';
  return Cookies.set(UserInfoKey, serializedData, { expires: 30, domain: domainName });
}

// Get user info from cookies
export function getUserInfoCookie(): string | undefined {
  return Cookies.get(UserInfoKey);
}

// Remove user info cookie
export function removeUserInfoCookie(): void {
  const { cookieKey }: CookieParams = cookieParams(UserInfoKey);
  Cookies.remove(cookieKey, { domain: domainName });
}

// Remove specific token
export function removeToken(key: string): void {
  Cookies.remove(key, { domain: domainName });
}

// Remove refresh token
export function removeAuthToken(): void {
  Cookies.remove(RefreshTokenKey, { domain: domainName });
}

// Remove all authentication-related tokens
export function removeAllToken(): void {
  Cookies.remove(UserInfoKey, { domain: domainName });
  Cookies.remove(RefreshTokenKey, { domain: domainName });
  Cookies.remove(TokenKey, { domain: domainName });
}

// Internal function to determine cookie parameters
function cookieParams(key: string = TokenKey): CookieParams {
  let domain: string = 'localhost';
  const { hostname } = window.location;
  const cookieKey: string = key;

  if (hostname.indexOf('localhost') === -1) {
    domain = import.meta.env.VITE_DOMAIN_NAME || 'localhost';
  }

  return {
    domain,
    cookieKey,
  };
}