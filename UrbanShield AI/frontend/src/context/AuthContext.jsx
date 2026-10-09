import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Roles: 'citizen' | 'authority'
  const [user, setUser] = useState({
    name: "Piyush Jain",
    email: "citizen@demo.urbanshield.ai",
    role: "citizen", // default starting role
    zone: "Zone 02 — Central Business District"
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password, roleChoice = "citizen") => {
    const isAuth = roleChoice === "authority";
    setUser({
      name: isAuth ? "Eng. A. Sharma (Operator)" : "Piyush Jain (Citizen)",
      email: email || (isAuth ? "authority@demo.urbanshield.ai" : "citizen@demo.urbanshield.ai"),
      role: roleChoice,
      zone: "Zone 02 — Central Business District"
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const setRole = (role) => {
    setUser(prev => ({
      ...prev,
      role,
      name: role === 'authority' ? "Eng. A. Sharma (Operator)" : "Piyush Jain (Citizen)",
      email: role === 'authority' ? "authority@demo.urbanshield.ai" : "citizen@demo.urbanshield.ai"
    }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
