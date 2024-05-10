import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [jwt, setJWT] = useState();
  const [user, setUser] = useState();



  useEffect(() => {
    localStorage.getItem('jwt') && setJWT(JSON.parse(localStorage.getItem('jwt')));
    localStorage.getItem('user_cus') && setUser(JSON.parse(localStorage.getItem('user_cus')));
  }, [])

  const login = (jwt, user) => {

    localStorage.setItem("jwt", JSON.stringify(jwt))
    localStorage.setItem("user_cus", JSON.stringify(user.username))
    setJWT(jwt);
    setUser(user.username);


  }

  const logOut = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("user_cus")
    setJWT();
    setUser();
    window.location.reload()

  }


  return (
    <UserContext.Provider value={{
      jwt,
      user,
      login,
      logOut
    }}>
      {children}

    </UserContext.Provider>



  );
};

export { UserProvider }
