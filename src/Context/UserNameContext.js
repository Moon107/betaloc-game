import React, { createContext, useState } from 'react';

const UserNameContext = createContext(null);

export const UserNameProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleNameChange = (event) => {
    setUserName(event.target.value);
    
  };
  const handleEmailChange = (event) => setUserEmail(event.target.value);

  return (
    <UserNameContext.Provider value={{ userName, handleNameChange, userEmail, handleEmailChange, setUserName,setUserEmail  }}>
      {children}
    </UserNameContext.Provider> 
  );
};

export default UserNameContext; // export UserNameContext as the default export

