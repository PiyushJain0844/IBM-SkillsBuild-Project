import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // Roles: 'citizen' | 'authority'
  const [role, setRole] = useState('authority');

  const toggleRole = () => {
    setRole(prev => (prev === 'citizen' ? 'authority' : 'citizen'));
  };

  return (
    <RoleContext.Provider value={{ role, setRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
