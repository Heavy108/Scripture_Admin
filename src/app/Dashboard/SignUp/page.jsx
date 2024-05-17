"use client";
import style from "@/CSS/SignUp.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {
    try {
      const response = await axios.post("/app/api/SignUp", user);
      console.log("Signup success", response.data);
      router.push("/Login");
    } catch (error) {
      console.log("Signup failed", error.message);
    }
  };

  useEffect(() => {
    if (user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={style.Signupframe}>
        <img src="/signUp.svg"/>
        <div className={style.Introduction}>
            <div className={style.form}>
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      </div>
    <div className={style.form}>
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      </div>
      <button onClick={onSignup}>SignUp</button>
      <Link href="/Login">Visit login page</Link>
      </div>
    </div>
  );
}
export default SignupPage;
