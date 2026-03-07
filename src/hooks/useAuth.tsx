import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: "admin" | "user" } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const login = (email: string, _password: string) => {
    // Mock authentication
    const isAdmin = email.toLowerCase().includes("admin");
    setUser({
      name: isAdmin ? "John Admin" : "Sarah Ops",
      email,
      role: isAdmin ? "admin" : "user",
    });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
