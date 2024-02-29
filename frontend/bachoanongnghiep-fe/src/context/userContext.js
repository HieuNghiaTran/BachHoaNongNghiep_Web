import React, { useContext, useState } from 'react';

const UserContext = React.createContext({ username: '', auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ username: '', auth: false });

  const loginContext = (username) => {
    setUser((user) => ({
      username: username,
      auth: true,
    }));
  };

  const logout = () => {
    setUser((user) => ({
      username: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>



  );
};

export { UserContext, UserProvider}
