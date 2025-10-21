import type { ApiResponse } from '@/lib/validation';
import { createAuthenticatedMutation } from '@/lib/utils/fetcher';
import type { ProjectType } from '../lib/types';

export type ProjectUpdateInput = Partial<Pick<
  ProjectType,
  'name' | 'project_folder' | 'description' | 'git_branches' | 'is_favorite' | 'is_archived'
>>;

export type UpdateProjectResponse = ApiResponse<ProjectType>;

export async function updateProject(
  id: string,
  data: ProjectUpdateInput
): Promise<UpdateProjectResponse> {
  const mutate = createAuthenticatedMutation<UpdateProjectResponse, ProjectUpdateInput>(
    `/projects/${id}`,
    { method: 'PATCH' }
  );
  return mutate(data);
}
