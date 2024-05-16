
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Newsletter from "@/Models/NewsletterModel";

connect();

export async function fetchSubscriberData() {
  try {
    const Data = await Newsletter.find({}, { Username: 1, Email: 1,_id:0,Date:1 }).lean().exec();
    const plainObjects = Data.map(obj => {
      return {
        ...obj,
        Date: obj.Date.toJSON(),
        
      };
    });
    // console.log(plainObjects)
    return plainObjects;
    // return Data;
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

