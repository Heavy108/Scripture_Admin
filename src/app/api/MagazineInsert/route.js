import { NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig';
import Magazine from '@/Models/MagazineModel';

export async function POST(request) {
  try {
    await connect();
    const data = await request.formData();
    let pdfBuffer;
    let imageBuffer;

    // Handle image file upload
    const imageFile = data.get('image');
    let imageFileName;
    if (imageFile) {
      const imageBytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(imageBytes);
      
    }

    // Handle PDF file upload
    const pdfFile = data.get('pdfadress');
    let pdfFileName;
    if (pdfFile) {
      const pdfBytes = await pdfFile.arrayBuffer();
       pdfBuffer = Buffer.from(pdfBytes);
      
    }

    // Extract other form fields
    const _id = data.get('_id');
    console.log("from rote",_id)
    const field = data.get('field');
    const tags = data.get('tags');
    const Date = data.get('Date');
    const Title = data.get('Title');
    const Description = data.get('Description');
    const Para1 = data.get('Para1');

    // Save data to the database
    const magazine = await Magazine.create(
      { _id:_id ,

        field:field,
        tags:tags,
        Date:Date,
        Title:Title,
        Description:Description,
        // image: imageFileName ? `/uploads/${imageFileName}` : null,
        image:imageBuffer,
        Para1:Para1,
        // pdfaddress: pdfFileName ? `/pdf/${pdfFileName}` : null,
        pdf:pdfBuffer
      },

    );

    return NextResponse.json({ success: true, magazine });
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}