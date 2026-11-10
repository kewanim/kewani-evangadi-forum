import { createContext, useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

import { axiosInstance, TOKEN_KEY } from "./utility/axios";
import AppRouter from "./routes/AppRouter.jsx";

export const UserState = createContext(); // Context that shares the logged-in user

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Ask the server who the token belongs to; send visitors without a valid token to /auth
  const getUserData = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return navigate("/auth");
      }

      const userData = await axiosInstance
        .get("/users/check")
        .then((response) => response.data);

      setUser(userData);
    } catch {
      navigate("/auth");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserState.Provider value={{ user, setUser }}>
      <AppRouter />
    </UserState.Provider>
  );
}

export default App;
