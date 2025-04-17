import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import Homepage from "./Homepage";
import SearchResults from "./SearchResults";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
