import style from "@/CSS/Newsletter.module.css";

function Newsletter(props) {
    // Function to format date string
    const formatDate = (dateString) => {
        const options = { month: 'long', day: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
           
                <div className={style.fields}>
                    <li>{props.val}</li>
                    <li>{props.Username}</li>
                    <li>{props.Email}</li>
                    <li>{formatDate(props.Date)}</li> {/* Format the date */}
               
           

            </div>
            <hr style={{backgroundColor:"#d9d9d9",opacity:"0.5"}}/>
        </>
    )
}

export default Newsletter;
