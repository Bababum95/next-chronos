import mongoose, { Schema } from 'mongoose';

export type FileDoc = {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  originalName: string;
  mimeType: string;
  size: number;
  data: Buffer;
  purpose: 'avatar';
  createdAt: Date;
  updatedAt: Date;
};

const FileSchema = new Schema<FileDoc>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    data: {
      type: Buffer,
      required: true,
    },
    purpose: {
      type: String,
      enum: ['avatar'],
      default: 'avatar',
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
FileSchema.index({ user: 1 });
FileSchema.index({ createdAt: -1 });

export const File = mongoose.models.File || mongoose.model<FileDoc>('File', FileSchema);
