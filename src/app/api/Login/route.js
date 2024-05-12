import { db } from "@/dbconfig/dbfirebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    const userDocRef = doc(db, "Users", username);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const userData = userDocSnap.data();
    console.log("User exists");
    // console.log(userData);

    const validPassword = await bcryptjs.compare(password, userData.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    console.log(userData);
    return NextResponse.json(
      { message: "User Login successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
