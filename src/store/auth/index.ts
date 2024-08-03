import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import type { AtomEffect } from 'recoil';

import { utc_now } from '@/utils/time';

import type { AuthTokenType } from './types';

const AUTH_LOCAL_STORAGE = 'user_auth';

const localStorageEffect: AtomEffect<AuthTokenType | null> = ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(AUTH_LOCAL_STORAGE);
  if (savedValue == null) {
    // 초기화의 경우
    setSelf(null);
  }
  if (savedValue != null) {
    // console.log(`savedValue : ${savedValue}`);
    // setSelf(JSON.parse(JSON.parse(savedValue)) as AuthTokenType);
    setSelf(JSON.parse(savedValue) as AuthTokenType);
  }
  onSet((newValue, _, isReset) => {
    if (isReset) return localStorage.removeItem(AUTH_LOCAL_STORAGE);
    if (newValue == null) return localStorage.removeItem(AUTH_LOCAL_STORAGE);
    return localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(newValue));
  });
};

const AuthState = atom<AuthTokenType | null>({
  key: 'auth-token-state',
  effects: [localStorageEffect],
  default: null,
});

type Actions = {
  setAuthTokens: (authInfo: AuthTokenType) => void;
  clearAuthInfo: () => void;
};

type AuthState = {
  loggedIn: boolean;
};

export default function useAuthState(): [AuthTokenType | null, AuthState, Actions] {
  const [authInfo, setAuthInfo] = useRecoilState(AuthState);

  const setAuthTokens = (authInfo: AuthTokenType) => {
    setAuthInfo(authInfo as AuthTokenType);
  };

  // FIXME: localstorage change listen -> hook

  const clearAuthInfo = () => {
    setAuthInfo(null);
    localStorage.removeItem(AUTH_LOCAL_STORAGE);
  };

  // TODO: token 유효기간 임박하면 refresh

  // TODO: token 유효기간 지나면 삭제

  // useEffect(() => {
  //   if (authInfo && authInfo.expires_in < utc_now()) {
  //     setAuthInfo(null);
  //   }
  // }, [authInfo?.expires_in]);
  // FIXME: setTimeout으로 주기적으로 확인해야하는가?,
  if (authInfo && authInfo.expires_in < utc_now()) {
    setAuthInfo(null);
  }
  return [
    authInfo,
    { loggedIn: !!authInfo && !!authInfo.id_token },
    { setAuthTokens, clearAuthInfo },
  ];
}
