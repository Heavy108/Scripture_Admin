import { db } from "@/dbconfig/dbfirebase";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { username, password, userType, email } = reqBody;
    console.log(reqBody);


    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    console.log("hisdhifsdif");

    // Create the document reference
    const userDocRef = doc(db, "Users", username);



    console.log("UserType:", username);
    await setDoc(userDocRef, {
      name: username,
      password: hashedPassword,
      usertype: userType,
      Email: email,
    });

    console.log("Document written with ID: ", username);
    return NextResponse.json({ message: "User added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error creating user document:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}