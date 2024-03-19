
import { createContext, useContext } from 'react';

const UserRoleContext = createContext();

export const useUserRole = () => {
  return useContext(UserRoleContext);
};

export const UserRoleProvider = ({ children, value }) => {
  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};
