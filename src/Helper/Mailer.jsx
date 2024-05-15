import style from "@/CSS/Mailer.module.css";
function mailForm(){
    return(
        <>
        <div className={style.mailbody}>
        <form onSubmit={onSubmit}>
          <label htmlFor="Subject" className={style.label}>
            Subject
          </label>
          <div className={style.input_container}>
            <input
              placeholder="Enter Subject"
              className={style.input_field}
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
              value={user.field}
            />
          </div>
            </form>
        </div>
        </>
    )
}