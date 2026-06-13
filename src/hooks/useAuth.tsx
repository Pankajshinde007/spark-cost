import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: "admin" | "user" } | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  adminLogin: (name: string, password: string) => boolean;
  updateProfile: (data: { name?: string; email?: string; password?: string }) => boolean;
  logout: () => void;
  setAuthenticatedUser: (name: string, email: string) => void;
}

const ADMIN_NAME = "pankaj shinde";
const ADMIN_PASSWORD = "1234";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (token && userEmail) {
      setUser({
        name: userName || "User",
        email: userEmail,
        role: adminLoggedIn === "true" ? "admin" : "user",
      });
    }
  }, []);

  const setAuthenticatedUser = (name: string, email: string) => {
    setUser({
      name,
      email,
      role: "user",
    });

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
  };

  const login = (email: string, _password: string) => {
    setUser({
      name: "Sarah Ops",
      email,
      role: "user",
    });

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", "Sarah Ops");

    return true;
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({
      name,
      email,
      role: "user",
    });

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);

    return true;
  };

  const updateProfile = (data: { name?: string; email?: string; password?: string }) => {
    if (!user) return false;

    const updatedUser = {
      ...user,
      name: data.name || user.name,
      email: data.email || user.email,
    };

    setUser(updatedUser);
    localStorage.setItem("userName", updatedUser.name);
    localStorage.setItem("userEmail", updatedUser.email);

    return true;
  };

  const adminLogin = (name: string, password: string) => {
    if (name.toLowerCase().trim() === ADMIN_NAME && password === ADMIN_PASSWORD) {
      const adminUser = {
        name: "Pankaj Shinde",
        email: "pankjbs8298@gmail.com",
        role: "admin" as const,
      };

      setUser(adminUser);
      localStorage.setItem("userName", adminUser.name);
      localStorage.setItem("userEmail", adminUser.email);
      localStorage.setItem("adminLoggedIn", "true");

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("adminLoggedIn");
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        signup,
        adminLogin,
        updateProfile,
        logout,
        setAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};