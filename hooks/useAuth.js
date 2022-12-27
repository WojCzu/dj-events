import { createContext, useContext, useEffect, useState } from "react";
import { NEXT_URL } from "@/config/index";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const register = async ({ username, email, password }) => {
    const response = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const { user, message } = await response.json();
    if (response.ok) {
      setUser(user);
      router.push("/account/dashboard");
    } else {
      toast.error(message);
    }
  };

  const login = async ({ email: identifier, password }) => {
    const response = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    const { user, message } = await response.json();
    if (response.ok) {
      setUser(user);
      router.push("/account/dashboard");
    } else {
      toast.error(message);
    }
  };

  const logout = async () => {
    const response = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    if (response.ok) {
      setUser(null);
      router.push("/");
    }
  };

  const isUserLoggedIn = async () => {
    const response = await fetch(`${NEXT_URL}/api/user`);
    const { user } = await response.json();
    if (response.ok) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, isUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
