import Displaymag from "@/Helper/DisplayMag";
import { fetchData } from "@/app/api/Magazine/route";
import DashBoard from "@/Helper/DashBoardNavigation";

const  Data = await fetchData();

function Display(){
    return(
        <>
        {/* <DashBoard/> */}
        
        <div style={{display:"flex",flexDirection:"row"}}>
        <DashBoard/>
        <div style={{flexDirection:"column" , overflow:"hidden"}}>
        <Displaymag data={Data}/>
        </div>
        </div>
        </>
    )
}

export default Display;