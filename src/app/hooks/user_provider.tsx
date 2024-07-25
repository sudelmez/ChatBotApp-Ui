import React, { ReactNode, useState } from 'react';
import UserContext from '../context/user_context';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
