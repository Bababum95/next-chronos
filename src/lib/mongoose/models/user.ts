import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDoc = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  apiKey: string;
  isEmailVerified: boolean;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserMethods = {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
};

const UserSchema = new Schema<UserDoc, mongoose.Model<UserDoc>, UserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
      default: () => `chronos_${uuidv4()}`,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to find user by API key
UserSchema.statics.findByApiKey = async function (apiKey: string) {
  const user = await this.findOne({ apiKey }).lean<UserDoc>().exec();
  if (!user) return null;
  return { ...user, _id: user._id.toString() };
};

export interface UserModel extends mongoose.Model<UserDoc, {}, UserMethods> {
  findByApiKey: (apiKey: string) => Promise<UserDoc | null>;
}

export const User =
  (mongoose.models.User as UserModel) || mongoose.model<UserDoc, UserModel>('User', UserSchema);
