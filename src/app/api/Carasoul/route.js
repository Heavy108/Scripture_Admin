
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Carasoul from "@/Models/CarasoulModel";

connect();

export async function fetchCarasoulData() {
  try {
    const Data = await Carasoul.find();
    const encodedData = Data.map(item => ({
      ...item.toObject(),
      image: item.image.toString('base64')
    }));
    // console.log(encodedData)
   return encodedData;
    // return Data;
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

