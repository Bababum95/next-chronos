import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

import { dbConnect } from '@/lib/mongoose';
import { File } from '@/lib/mongoose';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Connect to database
    await dbConnect();

    const { id } = await params;
    const fileId = new mongoose.Types.ObjectId(id);

    // Find file in database
    const fileRecord = await File.findById(fileId);
    if (!fileRecord) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return new NextResponse(fileRecord.data, {
      headers: {
        'Content-Type': fileRecord.mimeType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        'Content-Length': fileRecord.size.toString(),
      },
    });
  } catch (error) {
    console.error('File retrieval error:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
