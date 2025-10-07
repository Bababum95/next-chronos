import mongoose, { Schema } from 'mongoose';

export type ProjectDoc = {
  user: mongoose.Types.ObjectId; // owner
  project_folder: string[]; // absolute or relative path
  git_branches: string[];
  alternate_project?: string; // alias (optional)
  parent?: mongoose.Types.ObjectId;
  description?: string;
  name: string;
};

interface ProjectModel extends mongoose.Model<ProjectDoc> {
  findByPath: (
    userId: mongoose.Types.ObjectId,
    path: string
  ) => mongoose.Query<ProjectDoc | null, ProjectDoc>;
}

const ProjectSchema = new Schema<ProjectDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    project_folder: { type: [String], required: true },
    git_branches: { type: [String], default: [] },
    alternate_project: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: 'Project' },
    description: { type: String },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

ProjectSchema.index({ user: 1 });
ProjectSchema.index({ project_folder: 1 });
ProjectSchema.index({ parent: 1 });
ProjectSchema.index({ name: 1 });
ProjectSchema.index({ user: 1, project_folder: 1 }, { unique: true });

ProjectSchema.statics.findByPath = function (userId: mongoose.Types.ObjectId, path: string) {
  const parts = path
    .split('/')
    .map((p) => p.trim())
    .filter(Boolean);

  return this.findOne({
    user: userId,
    project_folder: parts,
  });
};

export const Project =
  (mongoose.models.Project as ProjectModel) ||
  mongoose.model<ProjectDoc, ProjectModel>('Project', ProjectSchema);
