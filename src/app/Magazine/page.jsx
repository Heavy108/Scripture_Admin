import Displaymag from "@/Helper/DisplayMag";
import { fetchData } from "@/app/api/Magazine/route";
import DashBoard from "@/Helper/DashBoardNavigation";
import Link from "next/link";

const  Data = await fetchData();

function Display(){
    return(
        <>
        {/* <DashBoard/> */}
        
        <div style={{display:"flex",flexDirection:"row"}}>
        {/* <DashBoard/> */}
        <div style={{flexDirection:"column" , overflow:"hidden"}}>
            <Link href='/MagazineInsert'><button>Add</button></Link>
        <Displaymag data={Data}/>
        </div>
        </div>
        </>
    )
}

export default Display;