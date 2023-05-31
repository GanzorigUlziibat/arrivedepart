// UserProvider.js
import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [detail, setDetail] = useState("");

  const updateUser = (resp) => {
    setDetail(resp);
  };

  return (
    <UserContext.Provider value={{ detail, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
