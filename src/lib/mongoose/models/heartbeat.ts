import mongoose, { Schema } from 'mongoose';

export type HeartbeatDoc = {
  time: number;
  entity: string;
  is_write: boolean;
  lineno: number;
  cursorpos: number;
  lines_in_file: number;
  alternate_project?: string;
  git_branch?: string;
  project_folder?: string;
  project_root_count?: number;
  language?: string;
  category?: 'debugging' | 'ai coding' | 'building' | 'code reviewing';
  ai_line_changes?: number;
  human_line_changes?: number;
  is_unsaved_entity?: boolean;
};

const HeartbeatSchema = new Schema<HeartbeatDoc>(
  {
    time: { type: Number, required: true },
    entity: { type: String, required: true },
    is_write: { type: Boolean, required: true },
    lineno: { type: Number, required: true },
    cursorpos: { type: Number, required: true },
    lines_in_file: { type: Number, required: true },
    alternate_project: { type: String },
    git_branch: { type: String },
    project_folder: { type: String },
    project_root_count: { type: Number },
    language: { type: String },
    category: { type: String, enum: ['debugging', 'ai coding', 'building', 'code reviewing'] },
    ai_line_changes: { type: Number },
    human_line_changes: { type: Number },
    is_unsaved_entity: { type: Boolean },
  },
  { timestamps: true }
);

export const Heartbeat =
  mongoose.models.Heartbeat || mongoose.model<HeartbeatDoc>('Heartbeat', HeartbeatSchema);
