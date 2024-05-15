'use client'
import DashBoard from "@/Helper/DashBoardNavigation";
import Link from "next/link";
import style from "@/CSS/Mailer.module.css";
import { useState } from "react";



function Display(){

    const [subject ,setSubject] =useState('');
    const [message,setMessage] =useState("");

    const sendMail =async(e) =>{
            e.preventDefault();
            try{
                const response =await fetch('/api/Mailer',{
                    method:"POST",
                    headers:{
                        'content-type':'application/json',
                    },
                    body:JSON.stringify({
                        subject,
                        message
                    })
                })
                console.log(await response.json())
            }catch(error){
                console.error("Mailer Failed",error.message)
            }
    }
    return(
        <>
        {/* <DashBoard/> */}
        
        <div style={{display:"flex",flexDirection:"row"}}>
        <DashBoard/>
        <div style={{flexDirection:"column" , overflow:"hidden"}}>
        <form onSubmit={sendMail}>
          <label htmlFor="Subject" className={style.label}>
            Subject
          </label>
          <div className={style.input_container}>
            <input
              placeholder="Enter Subject"
              className={style.input_field}
              value={subject}
              onChange={(e)=>{
                setSubject(e.target.value)
              }}
              id="Subject"
              name="Subject"
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
              cols={10}
              row={5}
              value={message}
              onChange={(e)=>{
                setMessage(e.target.value)
              }}

            />
          </div>
          <input type="submit" />
            </form>
        </div>
        </div>
        </>
    )
}

export default Display;