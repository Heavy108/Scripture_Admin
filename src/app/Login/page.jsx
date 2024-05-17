"use client";
// import "../global.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState,useEffect } from "react";
import style from "@/CSS/Login.module.css";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      
      const response = await axios.post("/api/Login", user);
      console.log("Login success", response.data);
      
      router.push("/Dashboard/Home");
    } catch (error) {
      console.log("Login failed", error);
     
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <div className={style.LoginFrame}>
        <img src="/Login.svg" className={style.LoginImage}/>
        <div className={style.FormContainer}>
          <h1>Scripture</h1>
          <h2>Welcome to Scripture</h2>
          <p>Please Sign-in to your account</p>

          <div className={style.form}>
            <h1>{loading ? "Processing" : "Login"}</h1>
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
            />
            </div>
            <label htmlFor="password" className={style.label}>password</label>
            <div className={style.input_container}>
            
            <input
              className={style.input}
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
            </div>
            <button
              onClick={onLogin}
              className={style.Button}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
