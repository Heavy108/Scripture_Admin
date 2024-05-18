import EditForm from "@/Helper/EditForm";
import { fetchformData } from "@/app/api/Edit/route";


async function EditMagazine({searchParams}){
    const id= searchParams._id;
    const Data =await fetchformData(id);
    
    return(
        <>
        <EditForm data={Data}/> 
        </>
    )
}
export default EditMagazine;