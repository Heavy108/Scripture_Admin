import {connect} from '@/dbconfig/dbconfig';
import { NextResponse } from 'next/server';
import Magazine from '@/Models/MagazineModel';

export async function POST(request) {
    try {
      const { id } = await request.json();
      await Magazine.findByIdAndDelete({_id:id})
  
      return NextResponse.json({ message: 'Success' });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }