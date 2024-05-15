import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { subject, message } = await request.json();
const email =process.env.EMAIL;
const pass =process.env.PASSWORD
    const transporter = nodemailer.createTransport({
      // host: process.env.HOST,
      // PORT: 2525,
    //   secure: true,
    service:"gmail",
      auth: {
        user: email,
        pass
      },
      
    });
   
    const mailoption = {
      from: email,
      to: "Heavy1089@gmail.com",
      subject: "Newsletter",
      html: `
        <h3>Hello Heavy108</h3>
        <li>title:${subject}</li>
        <li>message:${message}</li>
        `,
    };
    await transporter.sendMail(mailoption);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to Send Email' }, { status: 500 });
  }
}
