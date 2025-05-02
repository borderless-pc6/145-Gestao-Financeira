import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateUsers from "./Components/CreateUsers/CreateUsers";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import UserList from "./Components/UsersList/UsersList";
import { AuthProvider, useAuth } from "./Routes/AuthContext/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRout";

const HomePageWrapper: React.FC = () => {
  const { logout } = useAuth();

  return <HomePage onLogout={logout} />;
};

const UserListWrapper: React.FC = () => {
  return <UserList />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <HomePageWrapper />
              </PrivateRoute>
            }
          />
          <Route path="/create-user" element={<CreateUsers />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserListWrapper />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;