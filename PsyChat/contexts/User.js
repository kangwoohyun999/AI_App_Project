import React, { createContext, useState } from 'react';

const UserContext = createContext({
  user: null,
  dispatch: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = ({ email, uid }) =>
    setUser({ email, uid });
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
