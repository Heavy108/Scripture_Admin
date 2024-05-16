import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Newsletter from "@/Models/NewsletterModel";

export async function POST(request) {
  try {
    const { subject, message } = await request.json();
    const email = process.env.EMAIL;
    const pass = process.env.PASSWORD;
    const data = await Newsletter.find({}, { Email: 1 }).lean();
    console.log(data);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass
      }
    });

    // Loop through each email in the data array and send an email to each one
    for (const recipient of data) {
      const mailoption = {
        from: email,
        to: recipient.Email,
        subject: "Newsletter",
        html: `
          <h3>Hello</h3>
          <p>Title: ${subject}</p>
          <p>Message: ${message}</p>
        `
      };

      await transporter.sendMail(mailoption);
    }

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json({ message: "Failed to Send Emails" }, { status: 500 });
  }
}
