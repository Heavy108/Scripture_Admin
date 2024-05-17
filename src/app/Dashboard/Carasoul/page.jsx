import "../global.css";
import DashCarasoul from "@/Helper/DashCarasoul";
import { fetchCarasoulData } from "@/app/api/Carasoul/route";


const Data=await fetchCarasoulData()
// const serializedData = Data.map((item) => item.toObject());
function CarasoulUpdate(){
    

    return(
        <>
        <div style={{display:"flex",flexDirection:"row"}}>
        {/* <DashBoard/> */}
        <div style={{flexDirection:"column" , overflow:"hidden"}}>
        <DashCarasoul Data={Data}/>
        </div>
        </div>
        </>
        
    )
}
export default CarasoulUpdate;
