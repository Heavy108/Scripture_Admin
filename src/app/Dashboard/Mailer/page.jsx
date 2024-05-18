"use client";
import style from "@/CSS/Mailer.module.css";
import { useState } from "react";

function Display() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/app/api/Mailer", {
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
      <form onSubmit={sendMail}>
        <label htmlFor="Subject" className={style.label}>
          Subject
        </label>
        <div className={style.input_container}>
          <input
            placeholder="Enter Subject"
            className={style.input_field}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            id="Subject"
            name="Subject"
            disabled={loading}
          />
        </div>

        <label htmlFor="Message" className={style.label}>
          Message
        </label>
        <div className={style.input_container}>
          <input
            placeholder="Enter Message"
            className={style.input_field}
            id="Message"
            name="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </>
  );
}

export default Display;
