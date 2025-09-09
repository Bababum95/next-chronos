import { z } from 'zod';

export const HeartbeatsSchema = z.object({
  heartbeats: z
    .array(
      z.object({
        time: z.number(),
        entity: z.string(),
        is_write: z.boolean(),
        lineno: z.number(),
        cursorpos: z.number(),
        lines_in_file: z.number(),
        alternate_project: z.string().optional(),
        git_branch: z.string().optional(),
        project_folder: z.string().optional(),
        project_root_count: z.number().optional(),
        language: z.string().optional(),
        category: z.enum(['debugging', 'ai coding', 'building', 'code reviewing']).optional(),
        ai_line_changes: z.number().optional(),
        human_line_changes: z.number().optional(),
        is_unsaved_entity: z.boolean().optional(),
      })
    )
    .min(1, 'At least one heartbeat is required'),
});

export const SummariesQuerySchema = z.object({
  start: z.string().min(1),
  end: z.string().min(1),
});

export type HeartbeatsInput = z.infer<typeof HeartbeatsSchema>;
export type SummariesQuery = z.infer<typeof SummariesQuerySchema>;

export function parseOrThrow<T>(schema: z.ZodTypeAny, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
    const error = new Error('ValidationError');
    (error as any).details = issues;
    throw error;
  }
  return result.data as T;
}
