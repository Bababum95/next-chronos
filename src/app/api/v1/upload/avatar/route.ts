import { NextRequest, NextResponse } from 'next/server';

import { dbConnect } from '@/lib/mongoose';
import { User, File } from '@/lib/mongoose';
import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create file record in database
    const fileRecord = new File({
      user: user._id,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      data: buffer,
      purpose: 'avatar',
    });

    await fileRecord.save();

    // Update user's avatar URL to point to file endpoint
    const avatarUrl = `/api/v1/files/${fileRecord._id}`;
    await User.findByIdAndUpdate(user._id, {
      avatarUrl,
      gallery: [...(user.gallery || []), avatarUrl],
    });

    return NextResponse.json({
      success: true,
      avatarUrl,
    });
  } catch (error) {
    console.error('Avatar upload error:', error);

    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
