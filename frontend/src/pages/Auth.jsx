import { useState } from "react";

import PageNav from "../components/PageNav";
import Login from "../components/Login";
import Register from "../components/Register";

import styles from "./Auth.module.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className={styles.auth}>
      <PageNav />

      <section className={styles.section}>
        {isLogin ? <Login /> : <Register />}
        <span className={styles.state}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin((is) => !is)}
            className={styles.toggleBtn}
          >
            {isLogin ? "Register Now" : "Log in"}
          </button>
        </span>
      </section>
    </main>
  );
}

export default Auth;
