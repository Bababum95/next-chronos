import { NextRequest, NextResponse } from 'next/server';

import { dbConnect } from '@/lib/mongoose';
import { User, File } from '@/lib/mongoose';
import { CustomError, extractApiKeyFromRequest, validateApiKeyAndFindUser } from '@/lib/auth';

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const apiKey = extractApiKeyFromRequest(request);
    const user = await validateApiKeyAndFindUser(apiKey);

    const fileRecord = await File.findOne({
      user: user._id,
    });

    if (!fileRecord) {
      return NextResponse.json({ error: 'No avatar to delete' }, { status: 404 });
    }

    // Delete file record from database
    await File.findByIdAndDelete(fileRecord._id);

    // Remove avatar URL from user
    await User.findByIdAndUpdate(user._id, {
      $unset: { avatarUrl: 1 },
    });

    return NextResponse.json({
      success: true,
      message: 'Avatar deleted successfully',
    });
  } catch (error) {
    console.error('Error processing avatar deletion:', error);

    if (error instanceof CustomError) {
      return NextResponse.json({ success: false, ...error }, { status: error.code });
    }

    return NextResponse.json({ success: false, error: 'Failed to delete avatar' }, { status: 500 });
  }
}
