import React from "react";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MadReaders</h1>
        {isAuthenticated && (
          <div className="user-info">
            <span>Welcome, {user?.getUsername()}</span>
          </div>
        )}
      </header>

      <main className="app-main">{children}</main>
    </div>
  );
};

export default Layout;
