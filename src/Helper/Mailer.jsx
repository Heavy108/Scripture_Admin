"use client";
import style from "@/CSS/Newsletter.module.css";
import { useState } from "react";

function Display() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      const data = await response.json();
      console.log(data);
      // Clear the form upon successful submission
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Mailer Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          disabled={loading}
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
          disabled={loading}
        />

        <button type="submit" className={style.button} disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </>
  );
}

export default Display;
