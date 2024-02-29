import React, { useContext, useState } from 'react';

const historyContext = React.createContext({});

const HisProvider = ({ children }) => {
  const [listHistory, setListHistory] = React.useState([]);

 

  return (
    <historyContext.Provider value={{ listHistory }}>
      {children}
    </historyContext.Provider>



  );
};

export { historyContext, HisProvider}
