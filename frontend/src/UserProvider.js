// UserProvider.js
import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [userid, setUserId] = useState(null);

  const updateUser = (id) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userid, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
