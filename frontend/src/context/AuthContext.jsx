import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthCtx =
  createContext();

export const useAuth = () =>
  useContext(AuthCtx);

export function AuthProvider({
  children,
}) {
  const [token, setToken] = 
    useState(null);

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // Load token initially
  useEffect(() => {
    const storedToken =
      localStorage.getItem(
        "token"
      );

    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }

    setLoading(false);
  }, []);

  // Login
  const login = (
    tokenData,
    userData
  ) => {
    localStorage.setItem(
      "token",
      tokenData
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setToken(tokenData);

    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setToken(null);

    setUser(null);
  };

  return (
    <AuthCtx.Provider
      value={{
        token,

        user,

        loading,

        isAuthenticated:
          !!token,

        login,

        logout,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}