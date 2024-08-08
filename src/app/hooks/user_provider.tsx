import React, { ReactNode, useState } from 'react';
import UserContext from '../context/user_context';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string>("");
  return (
    <UserContext.Provider value={{ token, setToken, user,setUser, transactionId, setTransactionId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
