import { NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbconfig';
import Magazine from '@/Models/MagazineModel';

export async function POST(request) {
  try {
    await connect();
    const data = await request.formData();
    let pdfBuffer;
    let imageBuffer;
    const _id = data.get('_id');
    console.log(_id)
    // Handle image file upload
    const imageFile = data.get('image');
    let imageFileName;
    if (imageFile) {
      const imageBytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(imageBytes);
     
    }

    // Handle PDF file upload
    const pdfFile = data.get('pdfadress');
   
    if (pdfFile) {
      const pdfBytes = await pdfFile.arrayBuffer();
       pdfBuffer = Buffer.from(pdfBytes);
     
    }
    const MagazineItems =await Magazine.find({_id:_id})


    console.log("from route")
    const field = data.get('field') || MagazineItems.field;
    const tags = data.get('tags') || MagazineItems.tags;
    const Date = data.get('Date') || MagazineItems.Date;
    const Title = data.get('Title') || MagazineItems.Title;
    const Description = data.get('Description') || MagazineItems.Description;
    const Para1 = data.get('Para1') || MagazineItems.Para1;
    const image = imageBuffer || MagazineItems.image;
    const pdf = pdfBuffer || MagazineItems.pdfaddress;
console.log("near the update function")
    // Save data to the database
     await Magazine.findOneAndUpdate(
      { _id:_id },
      
     {   field:field,
        tags:tags,
        Date:Date,
        Title:Title,
        Description:Description,
        image:image,
        Para1:Para1,
        pdfaddress:pdf
      },
      
    );
    // return NextResponse.redirect('/Home');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}