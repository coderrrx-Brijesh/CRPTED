import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context for managing login state
const LoginContext = createContext();

export const LogedinProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(""); 

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); 
      setIsLoggedIn(true);
      // use the right backend url here
      axios.get("/api/user", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //  log the user in 
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    setIsLoggedIn(true);

    // Save user data and token to
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // to logout
  const logout = () => {
    setUser(null);
    setToken("");
    setIsLoggedIn(false);

    // Remove user data and token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, user, login, logout, token }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;

