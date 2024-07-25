import { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  token: string;
  setToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
