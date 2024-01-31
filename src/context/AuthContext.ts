import { createContext, useContext } from "react";
import { LoginType } from "../utils/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuthContextValue = {
  userDataAuthContext: LoginType | null;
  isLoggedUser: boolean;
  logoutAuthContext: () => void;
  loginAuthContext: (userData: LoginType) => void;
  verifyLogged: () => void;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Fora do AuthProvider");
  }
  return context;
}
