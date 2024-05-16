"use client";
import style from "@/CSS/Newsletter.module.css";
import { useState } from "react";

function Display() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/Mailer", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message,
        }),
      });
      console.log(await response.json());
    } catch (error) {
      console.error("Mailer Failed", error.message);
    }
  };
  return (
    <>
      {/* <DashBoard/> */}

      <form onSubmit={sendMail} className={style.mail}>
        <label htmlFor="Subject" className={style.label}>
          Subject
        </label>
       
          <input
            placeholder="Enter Subject"
            className={style.input_field1}
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            id="Subject"
            name="Subject"
          />
    

        <label htmlFor="Message" className={style.label}>
          Message
        </label>
        
          <textarea
            placeholder="Enter Message"
            className={style.input_field2}
            id="Message"
            name="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
      
        <button type="submit" className={style.button}>Submit</button>
      </form>
    </>
  );
}

export default Display;
