import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateUsers from "./Components/CreateUsers/CreateUsers";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import { AuthProvider, useAuth } from "./Routes/AuthContext/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRout";

// Componente wrapper para HomePage com acesso ao AuthContext
const HomePageWrapper: React.FC = () => {
  const { logout } = useAuth();

  // Passa a função de logout do Firebase para o componente HomePage
  return <HomePage onLogout={logout} />;
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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;