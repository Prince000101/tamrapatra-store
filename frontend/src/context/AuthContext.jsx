import { createContext, useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const user = localStorage.getItem("userInfo");
    return user ? JSON.parse(user) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, []);

  // ==========================
  // LOGIN
  // ==========================

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      setUserInfo(data);

      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      return {
        success: true,
        user: data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Invalid email or password",
      };
    }
  };

  // ==========================
  // REGISTER
  // ==========================

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setUserInfo(data);

      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      return {
        success: true,
        user: data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    }
  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {
    setUserInfo(null);

    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    delete axios.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        user: userInfo,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!userInfo,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;