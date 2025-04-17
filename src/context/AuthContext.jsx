import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, login, logoutUser, register } from "../auth/cognito";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username, password) => {
    try {
      await login(username, password);
      await checkAuth();
      return true;
    } catch (error) {
      console.error("Sign in error:", error);
      return false;
    }
  };

  const signOut = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
  };

  const signUp = async (
    username,
    password,
    birthdate,
    gender,
    given_name,
    family_name,
    email
  ) => {
    try {
      await register(
        username,
        password,
        birthdate,
        gender,
        given_name,
        family_name,
        email
      );
      return true;
    } catch (error) {
      console.error("Sign up error:", error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    signIn,
    signOut,
    signUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
