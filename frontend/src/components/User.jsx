import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;
const getToken = () => {
  return localStorage.getItem("token");
};

function User() {
  const { user: data, logout } = useAuth();
  const [user, setUser] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${BASE_URL}/account`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setUser(response.data.user);
      } catch {}
    }

    fetchUser();
  }, []);

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      {/* <img src={user?.avatar} alt={user?.name} /> */}
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
