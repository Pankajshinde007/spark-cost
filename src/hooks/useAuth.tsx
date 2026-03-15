import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: "admin" | "user" } | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  adminLogin: (name: string, password: string) => boolean;
  updateProfile: (data: { name?: string; email?: string; password?: string }) => boolean;
  logout: () => void;
}

const ADMIN_NAME = "pankaj shinde";
const ADMIN_PASSWORD = "1234";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const login = (email: string, _password: string) => {
    setUser({
      name: "Sarah Ops",
      email,
      role: "user",
    });
    return true;
  };

  const adminLogin = (name: string, password: string) => {
    if (name.toLowerCase().trim() === ADMIN_NAME && password === ADMIN_PASSWORD) {
      setUser({
        name: "Pankaj Shinde",
        email: "pankjbs8298@gmail.com",
        role: "admin",
      });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
