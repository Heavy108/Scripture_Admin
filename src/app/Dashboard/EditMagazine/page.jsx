import Displaymag from "@/Helper/DisplayMag";
import EditForm from "@/Helper/EditForm";
import { fetchformData } from "@/app/api/Edit/route";

const Data =await fetchformData();
async function EditMagazine({searchParams}){
    const id= searchParams._id;
    const Data =await fetchformData(id);
    
    return(
        <>
        <EditForm data={Data}/> 
         {/* <Displaymag data={Data}/> */}
        </>
    )
}
export default EditMagazine;