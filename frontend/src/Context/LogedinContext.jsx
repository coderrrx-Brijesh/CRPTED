import { createContext, useState, useEffect } from "react";
import { api } from "../api"; // Import the api instance
import Cookies from "js-cookie"; // Import js-cookie library

// Create a context for managing login state
const LoginContext = createContext();

export const LogedinProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [showPopup, setShowPopup] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Function to check auth status on mount/refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First try to get token from cookies
        const storedToken = Cookies.get("authToken");
        const storedUser = Cookies.get("user");

        console.log(
          "Stored token check:",
          storedToken ? "exists" : "not found"
        );
        console.log("Stored user check:", storedUser ? "exists" : "not found");

        if (!storedToken) {
          console.log("No token found in cookies");
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        // Set initial state from cookies
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } catch (e) {
            console.error("Error parsing stored user data:", e);
          }
        }

        // Verify token with backend
        setToken(storedToken);

        // Configure axios to include token in all requests
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

        // Verify token with backend
        const response = await api.get("/user");

        // If we get here, token is valid
        setUser(response.data);
        setIsLoggedIn(true);
        console.log("Auto login successful:", response.data);
      } catch (error) {
        console.error("Auto login failed:", error);
        // Clear invalid auth data
        setIsLoggedIn(false);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Log the user in
  const login = (userData, token) => {
    console.log("Login function called with:", {
      userData,
      token: token ? "exists" : "missing",
    });

    if (!userData || !token) {
      console.error("Missing user data or token in login function");
      return;
    }

    setUser(userData);
    setToken(token);
    setIsLoggedIn(true);

    // Set axios default auth header
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Save user data and token to cookies
    Cookies.set("authToken", token, {
      expires: 7, // Token expires in 7 days
      secure: window.location.protocol === "https:",
      sameSite: "strict",
    });

    Cookies.set("user", JSON.stringify(userData), {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
    });

    console.log("User data and token saved to cookies");
  };

  // Logout
  const logout = () => {
    console.log("Logout function called");
    setUser(null);
    setToken("");
    setIsLoggedIn(false);

    // Remove axios auth header
    delete api.defaults.headers.common["Authorization"];

    // Remove user data and token from cookies
    Cookies.remove("authToken");
    Cookies.remove("user");
    console.log("Cookies removed");
  };

  return (
    <LoginContext.Provider
      value={{
        setIsLoggedIn,
        isLoggedIn,
        user,
        login,
        logout,
        token,
        showPopup,
        setShowPopup,
        isLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
