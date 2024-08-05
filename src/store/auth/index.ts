import { useCookies } from 'react-cookie';
import { atom, useRecoilState } from 'recoil';
import type { AtomEffect } from 'recoil';

import type { AuthTokenType } from './types';

const AUTH_LOCAL_STORAGE = 'user_auth';

const localStorageEffect: AtomEffect<AuthTokenType | null> = ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(AUTH_LOCAL_STORAGE);
  if (savedValue == null) {
    // 초기화의 경우
    setSelf(null);
  }
  if (savedValue != null) {
    console.log(`savedValue : ${savedValue}`);
    setSelf(JSON.parse(savedValue) as AuthTokenType);
  }
  onSet((newValue, _, isReset) => {
    if (isReset) return localStorage.removeItem(AUTH_LOCAL_STORAGE);
    if (newValue == null) return localStorage.removeItem(AUTH_LOCAL_STORAGE);
    return localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(newValue));
  });
};

export const AuthState = atom<AuthTokenType | null>({
  key: 'auth-token-state',
  effects: [localStorageEffect],
  default: null,
});

type Actions = {
  setAuthTokens: (authInfo: AuthTokenType) => void;
  clearAuthInfo: () => void;
};

type AuthState = {
  isLoggedIn: boolean;
};

type AuthTokens = {
  access_token: string | undefined;
  id_token: string | undefined;
  refresh_token: string | undefined;
};
export default function useAuthState(): [AuthTokens, AuthState, Actions] {
  const COOKIE_KEY = ['id_token', 'expires_in', 'issued', 'access_token', 'refresh_token'] as const;

  const [cookies, setCookie, removeCookie] = useCookies(
    ['id_token', 'expires_in', 'issued', 'access_token', 'refresh_token'],
    { doNotParse: true },
  );
  type sameSiteType = boolean | 'none' | 'lax' | 'strict' | undefined;
  const cookieOption = { sameSite: 'none' as sameSiteType, secure: true, httpOnly: false };
  const setAuthTokens = (authInfo: AuthTokenType) => {
    const _cookieOption = { ...cookieOption, maxAge: authInfo.expires_in };
    console.log(`_cookieOption : ${JSON.stringify(_cookieOption)}`);
    setCookie('expires_in', authInfo.expires_in, _cookieOption);
    setCookie('issued', authInfo.issued, _cookieOption);
    setCookie('access_token', authInfo.access_token, _cookieOption);
    setCookie('id_token', authInfo.id_token, _cookieOption);
    setCookie('refresh_token', authInfo.refresh_token, _cookieOption);
  };

  const clearAuthInfo = () => {
    removeCookie('expires_in');
    removeCookie('issued');
    removeCookie('access_token');
    removeCookie('id_token');
    removeCookie('refresh_token');
  };

  const isLoggedIn = cookies && cookies.id_token;

  // TODO: token 유효기간 임박하면 refresh
  // FIXME: setTimeout으로 주기적으로 확인해야하는가?,

  return [
    {
      access_token: cookies.access_token,
      id_token: cookies.id_token,
      refresh_token: cookies.refresh_token,
    },
    { isLoggedIn },
    { setAuthTokens, clearAuthInfo },
  ];
}
