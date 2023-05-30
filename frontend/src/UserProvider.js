// UserProvider.js
import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [userid, setUserId] = useState(null);
  const [firstname, setFirstname] = useState("");

  const updateUser = (id,name) => {
    setUserId(id);
    setFirstname(name);
  };

  return (
    <UserContext.Provider value={{ userid,firstname, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
