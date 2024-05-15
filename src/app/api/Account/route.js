import {connect} from "@/dbconfig/dbconfig";
import Magazine from "@/Models/MagazineModel";
import Newsletter from "@/Models/NewsletterModel";
import { NextResponse } from "next/server";

export async function fetchAccountData(){

    try{
        await connect();
        const magazine =await Magazine.countDocuments();
        const Subscriber= await Newsletter.countDocuments();
        const Research =await Magazine.countDocuments({tags:'Research'})
        const events =await Magazine.countDocuments({tags:'events'})
        const bytes =await Magazine.countDocuments({tags:'GDSC'})
        // console.log(events)
        return [magazine,Subscriber,Research,events,bytes]



    }catch(error){
        console.error({success:false})
        return NextResponse('Error Fetching Data' ,error.message)
    }
}