import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "register":
      toast.success("Registration successful");
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "login":
      toast.success("Login successful");
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "logout":
      toast.success("Logout successful");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "error":
      toast.error(action.payload || "Something went wrong");
      return { ...state, error: action.payload, isLoading: false };
    case "loadToken":
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload,
      };
    case "userData":
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      throw new Error("Unknown action");
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { user, token, isAuthenticated, isLoading, error } = state;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch({ type: "loadToken", payload: storedToken });
    }
  }, []);

  const fetchUser = async () => {
    if (!token) return;
    dispatch({ type: "loading" });
    try {
      const response = await axios.get(`${BASE_URL}/account`);
      console.log(response);
      dispatch({ type: "userData", payload: response.data });
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const register = async (userData) => {
    dispatch({ type: "loading" });
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "register", payload: response.data });
      return true;
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response?.data?.message || "Something went wrong",
      });
      return false;
    }
  };

  const login = async (credentials) => {
    dispatch({ type: "loading" });
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "login", payload: response.data });
      return true;
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response?.data?.message || "Login failed",
      });
      return false;
    }
  };

  const logout = async () => {
    dispatch({ type: "loading" });
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      dispatch({ type: "logout" });
      return true;
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response?.data?.message || "Logout failed",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        isLoading,
        register,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
