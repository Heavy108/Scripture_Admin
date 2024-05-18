import style from "@/CSS/Newsletter.module.css";
import { fetchSubscriberData } from "@/app/api/Newsletter/route";
import Mag_Section from "@/Helper/MagCluster";
import SubHeading from "@/Helper/SubHeading";

// console.log(Data)
async function Subscriber(){
    const Data = await fetchSubscriberData();

    return(
        <>
        
        <div className={style.container}>
        <SubHeading/>
       
        <ul className={style.headlist}>
        <li>S.No.</li>
        <li>Name</li>
        <li>Email ID</li>
        <li>Date Added</li>
        </ul>
       
        <Mag_Section Data ={Data} MagazinesPerPage={12}/>
        </div>
        </>
    )
}
export  default Subscriber;