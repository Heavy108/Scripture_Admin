import { NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig';
import Magazine from '@/Models/MagazineModel';

export async function POST(request) {
  try {
    await connect();
    const data = await request.formData();
    const _id = data.get('_id');

    // Handle image file upload
    const imageFiles = data.getAll('image');
    let imageBuffer;
    if (imageFiles.length > 0) {
      const imageBytes = await imageFiles[0].arrayBuffer();
      imageBuffer = Buffer.from(imageBytes);
    }

    // Handle PDF file upload
    const pdfFiles = data.getAll('pdfadress');
    let pdfBuffer;
    if (pdfFiles.length > 0) {
      const pdfBytes = await pdfFiles[0].arrayBuffer();
      pdfBuffer = Buffer.from(pdfBytes);
    }

    const MagazineItems = await Magazine.find({ _id });
    console.log('from route');
    const field = data.get('field') || MagazineItems[0].field;
    const tags = data.get('tags') || MagazineItems[0].tags;
    const Date = data.get('Date') || MagazineItems[0].Date;
    const Title = data.get('Title') || MagazineItems[0].Title;
    const Description = data.get('Description') || MagazineItems[0].Description;
    const Para1 = data.get('Para1') || MagazineItems[0].Para1;
    const image = imageBuffer || MagazineItems[0].image;
    const pdf = pdfBuffer || MagazineItems[0].pdfaddress;
    console.log('near the update function');

    // Save data to the database
    await Magazine.findOneAndUpdate(
      { _id },
      {
        field,
        tags,
        Date,
        Title,
        Description,
        image,
        Para1,
        pdfaddress: pdf,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}