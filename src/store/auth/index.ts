import { useCallback, useEffect, useMemo, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import type { AtomEffect } from 'recoil';

import type { AuthTokenType } from './types';

const default_auth_state: AuthTokenType = {
  access_token: undefined,
  expires_in: 0,
  issued: 0,
  id_token: undefined,
  refresh_token: undefined,
  scope: undefined,
  token_type: undefined,
};

const AUTH_LOCAL_STORAGE = 'user_auth';

const localStorageEffect: AtomEffect<AuthTokenType> = ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(AUTH_LOCAL_STORAGE);
  if (savedValue == null) {
    // 초기화의 경우
    setSelf(default_auth_state);
  }
  if (savedValue != null) {
    // console.log(`savedValue : ${savedValue}`);
    // setSelf(JSON.parse(JSON.parse(savedValue)) as AuthTokenType);
    setSelf(JSON.parse(savedValue) as AuthTokenType);
  }
  onSet((newValue, _, isReset) => {
    if (isReset) return localStorage.removeItem(AUTH_LOCAL_STORAGE);
    return localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(newValue));
  });
};

const AuthState = atom<AuthTokenType>({
  key: 'auth-token-state',
  effects: [localStorageEffect],
  default: default_auth_state,
});

// 사용자 닉네임,
type UserInfo = {};

type Actions = {
  setAuthTokens: (authInfo: AuthTokenType) => void;
  clearAuthInfo: () => void;
};

type AuthState = {
  loggedIn: boolean;
};

export default function useAuthState(): [AuthTokenType, AuthState, Actions] {
  const [authInfo, setAuthInfo] = useRecoilState(AuthState);
  const setAuthTokens = (authInfo: AuthTokenType) => {
    setAuthInfo(authInfo as AuthTokenType);
  };

  useEffect(() => {
    console.log(`authInfo change`);
  }, [authInfo]);

  // FIXME: localstorage change listen -> hook

  const clearAuthInfo = () => {
    setAuthInfo(default_auth_state);
    localStorage.removeItem(AUTH_LOCAL_STORAGE);
  };

  return [authInfo, { loggedIn: !!authInfo.id_token }, { setAuthTokens, clearAuthInfo }];
}
