import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie library

// Create a context for managing login state
const LoginContext = createContext();

export const LogedinProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get("authToken"); // Retrieve token from cookies
    const storedUser = Cookies.get("user"); // Retrieve user data from cookies

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);

      // Validate token or fetch user data from the backend
      axios
        .get("/api/user", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoggedIn(false);
          logout(); // Clear invalid token
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Log the user in
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    setIsLoggedIn(true);

    // Save user data and token to cookies
    Cookies.set("authToken", token, { expires: 7 }); // Token expires in 7 days
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken("");
    setIsLoggedIn(false);

    // Remove user data and token from cookies
    Cookies.remove("authToken");
    Cookies.remove("user");
  };

  return (
    <LoginContext.Provider value={{ setIsLoggedIn, isLoggedIn, user, login, logout, token }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
