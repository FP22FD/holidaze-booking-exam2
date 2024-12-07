import { createContext, ReactNode, useEffect, useState } from 'react';
import { ProfileData } from '../types/profile.type';

type UserType = 'guest' | 'customer' | 'manager';

interface PersistContextProps {
  profileData: ProfileData | null;
  setProfileData: (value: ProfileData) => void;

  accessToken: string | null;
  setAccessToken: (value: string) => void;

  logOut: () => void;

  requireUserLevel: (requiredUserType: UserType) => void;

  userType: UserType;
  isLoggedIn: boolean;
}

export const PersistContext = createContext<PersistContextProps | undefined>(undefined);

export const PersistProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isLoggedIn = !!profileData && !!accessToken;

  let userType: UserType = 'guest';
  if (accessToken && profileData?.venueManager === false) {
    userType = 'customer';
  }
  if (accessToken && profileData?.venueManager === true) {
    userType = 'manager';
  }

  useEffect(() => {
    const profileDataStored = localStorage.getItem('profileData');
    const accessTokenStored = localStorage.getItem('accessToken');

    if (profileDataStored) {
      setProfileData(JSON.parse(profileDataStored));
    }
    if (accessTokenStored) {
      setAccessToken(accessTokenStored);
    }

    setIsInitialized(true);
  }, []);

  const handleSetProfileData = (value: ProfileData) => {
    setProfileData(value);
    localStorage.setItem('profileData', JSON.stringify(value));
  };

  const handleSetAccessToken = (value: string) => {
    setAccessToken(value);
    localStorage.setItem('accessToken', value);
  };

  const handleLogout = () => {
    setAccessToken(null);
    setProfileData(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profileData');

    window.location.href = '/auth/login';
  };

  const handleRequireUserLevel = (requiredUserType: UserType) => {
    if (!isInitialized) {
      return;
    }

    let redirect = false;
    if (requiredUserType === 'customer' && userType !== 'customer' && userType !== 'manager') {
      redirect = true;
    } else if (requiredUserType === 'manager' && userType !== 'manager') {
      redirect = true;
    }

    if (redirect) {
      window.location.href = '/auth/login';
    }
  };

  return (
    <PersistContext.Provider
      value={{
        profileData,
        setProfileData: handleSetProfileData,
        accessToken,
        setAccessToken: handleSetAccessToken,
        logOut: handleLogout,
        requireUserLevel: handleRequireUserLevel,

        userType,
        isLoggedIn,
      }}
    >
      {children}
    </PersistContext.Provider>
  );
};
