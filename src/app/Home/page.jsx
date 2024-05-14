import Accounts from "@/Helper/Accounts";
import DashBoard from "@/Helper/DashBoardNavigation";

function DashHome(){

    return(
        <>
         <div style={{display:"flex",flexDirection:"row"}}>
        <DashBoard/>
        <div style={{flexDirection:"column" , overflow:"hidden"}}>
        <Accounts/>
        </div>
        </div>
        </>
    )
}


export default DashHome;