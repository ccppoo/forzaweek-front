import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { atom, useRecoilState } from 'recoil';

import { useQuery } from '@tanstack/react-query';

import { getProfile, getUserProfile } from '@/api/user/profile';

// 사용자 닉네임,
type UserProfile = {
  gamerTag: string;
  profileImage: string;
};

const UserProfileState = atom<UserProfile | undefined>({
  key: 'user-profile-token-state',
  default: undefined,
});

const useLocalStorageValue = <T>(key: string) => {
  const [data, setData] = useState<T | null>(() => {
    let item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as T;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      let item = localStorage.getItem(key);
      if (item === null) {
        setData(null);
        return;
      }
      setData(JSON.parse(item) as T);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return data;
};

function useUserProfile() {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);

  const [cookies, setCookie, removeCookie] = useCookies([
    'id_token',
    'expires_in',
    'issued',
    'access_token',
    'refresh_token',
  ]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['get user info', 'me', cookies.id_token],
    queryFn: getUserProfile,
    staleTime: cookies.expires_in * 1000,
    enabled: cookies && !!cookies.id_token,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUserProfile(data);
    }
  }, [isSuccess, data, setUserProfile]);

  useEffect(() => {
    if (!cookies) {
      setUserProfile(undefined);
    }
  }, [cookies, cookies.id_token]);

  return userProfile;
}

export default useUserProfile;
