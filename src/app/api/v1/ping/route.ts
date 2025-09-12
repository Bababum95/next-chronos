import { NextResponse } from 'next/server';

import { dbConnect } from '@/lib/mongoose';

export async function GET() {
  try {
    const conn = await dbConnect();
    const status = conn.connections[0].readyState;
    return NextResponse.json({ status, message: 'Connected' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error:', error);
    return NextResponse.error();
  }
}
