import React, { useEffect, useState } from "react";
import { AuthContextValue, AuthContext } from "./AuthContext";
import { LoginType } from "../utils/types";
import { useNavigate } from "react-router-dom";

// Recupere as informações do localStorage ao iniciar o aplicativo
const initialUserData = JSON.parse(localStorage.getItem("_userData") || "null");

// Componente AuthProvider que utiliza o contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<LoginType | null>(initialUserData);
  const [isLoggedUser, setIsLoggedUser] = useState<boolean>(
    initialUserData !== null
  );

  useEffect(() => {
    if (userData) {
      setIsLoggedUser(true);
      // Atualize o localStorage ao efetuar login
      localStorage.setItem("_userData", JSON.stringify(userData));
    } else {
      console.log("Usuário não logado");
      // Limpe o localStorage ao efetuar logout
      localStorage.removeItem("_userData");
    }
  }, [userData]);

  const login = (userDataResponse: LoginType) => {
    setUserData(userDataResponse);
  };

  // Função para efetuar logout
  const logout = () => {
    setUserData(null);
    navigate("/");
    window.location.reload();
  };

  const verifyLogged = () => {
    if (!isLoggedUser) {
      navigate("/login");
    }
  };

  // Valor do contexto que será fornecido
  const authContextValue: AuthContextValue = {
    userDataAuthContext: userData,
    isLoggedUser,
    logoutAuthContext: logout,
    loginAuthContext: login,
    verifyLogged,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
