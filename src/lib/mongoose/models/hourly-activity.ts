import mongoose, { Model, Schema } from 'mongoose';

import { env, HOUR } from '@/config';
import { calculateActiveTime, toHourEnd, toHourStart } from '@/lib/utils';

import { Heartbeat } from './heartbeat';

export type HourlyActivityDoc = {
  user: mongoose.Types.ObjectId;
  timestamp: number; // unix, начало часа
  composite_key: string;
  alternate_project?: string;
  project_folder?: string;
  git_branch?: string;
  language?: string;
  category?: 'debugging' | 'ai coding' | 'building' | 'code reviewing';
  time_spent: number; // в секундах
  createdAt: Date;
  updatedAt: Date;
};

export interface HourlyActivityModel extends Model<HourlyActivityDoc> {
  updateFromHeartbeats: (
    userId: mongoose.Types.ObjectId,
    start: number,
    end: number
  ) => Promise<void>;
}

const HourlyActivitySchema = new Schema<HourlyActivityDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    composite_key: { type: String, index: true, unique: true },
    timestamp: { type: Number, required: true },
    alternate_project: { type: String },
    project_folder: { type: String },
    git_branch: { type: String },
    language: { type: String },
    category: {
      type: String,
      enum: ['debugging', 'ai coding', 'building', 'code reviewing'],
    },
    time_spent: {
      type: Number,
      required: true,
      min: [0, 'Time spent must be non-negative'],
    },
  },
  { timestamps: true }
);

HourlyActivitySchema.index({ user: 1, timestamp: 1 });
HourlyActivitySchema.index({ user: 1, composite_key: 1 });

HourlyActivitySchema.statics.updateFromHeartbeats = async function (
  userId: mongoose.Types.ObjectId,
  start: number,
  end: number
) {
  // Compute startHour and endHour
  const startTimestamp = toHourStart(start);
  const endTimestamp = toHourEnd(end);

  // Fetch heartbeats for the user in the time range
  const heartbeats = await Heartbeat.find({
    user: userId,
    time: { $gte: startTimestamp, $lte: endTimestamp },
  }).sort({ time: 1 });

  // Group by category, language, project_folder, alternate_project, git_branch, hour (UTC), date (UTC)
  const groups = new Map();
  for (const hb of heartbeats) {
    const key = JSON.stringify({
      category: hb.category || null,
      language: hb.language || null,
      project_folder: hb.project_folder || null,
      alternate_project: hb.alternate_project || null,
      git_branch: hb.git_branch || null,
      timestamp: toHourStart(hb.time),
    });

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(hb);
  }

  // For each group, calculate activeTime and upsert HourlyActivity
  for (const [key, hb] of groups.entries()) {
    const first = hb[0];
    if (!first) continue;

    let activeTime = calculateActiveTime(hb, startTimestamp, endTimestamp);

    // If active time in the hour is within one interval of a full hour,
    // round it up to a full productive hour (3600 seconds).
    if (activeTime >= HOUR - env.intervalSec) activeTime = HOUR;

    await HourlyActivity.findOneAndUpdate(
      { composite_key: key },
      {
        $set: { time_spent: activeTime },
        $setOnInsert: {
          user: userId,
          category: first.category,
          language: first.language,
          project_folder: first.project_folder,
          alternate_project: first.alternate_project,
          git_branch: first.git_branch,
          timestamp: toHourStart(first.time),
        },
      },
      { upsert: true, new: true }
    );
  }
};

export const HourlyActivity =
  (mongoose.models.HourlyActivity as HourlyActivityModel) ||
  mongoose.model<HourlyActivityDoc, HourlyActivityModel>('HourlyActivity', HourlyActivitySchema);
