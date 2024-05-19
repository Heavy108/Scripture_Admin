"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import style from "@/CSS/Login.module.css";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/Login", user);
      console.log("Login success", response.data);
      router.push("/Dashboard/Home");
    } catch (error) {
      console.log("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.username && user.password));
  }, [user]);

  return (
    <div className={style.LoginFrame}>
      <img src="/Login.svg" className={style.LoginImage} alt="Login illustration" />
      <div className={style.FormContainer}>
        <h1>Scripture</h1>
        <h2>Welcome to Scripture</h2>
        <p>Please Sign-in to your account</p>
        <form className={style.form} onSubmit={onLogin}>
          <h1> Login</h1>
          <hr />
          <label htmlFor="username" className={style.label}>UserName</label>
          <div className={style.input_container}>
            <input
              className={style.input}
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="email"
              disabled={loading}
            />
          </div>
          <label htmlFor="password" className={style.label}>Password</label>
          <div className={style.input_container}>
            <input
              className={style.input}
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={style.Button}
            disabled={buttonDisabled || loading}
          >
            {loading ? "Processing.." : "Login here"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
