import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="dashboard">
      <h2>Your Dashboard</h2>
      <p>Welcome, {user?.getUsername()}!</p>
      <p>You are now signed in and can access all features!</p>
      <button onClick={signOut} className="signout-button">
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
