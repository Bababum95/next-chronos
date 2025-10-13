[**next-chronos**](../../../README.md)

***

[next-chronos](../../../README.md) / [lib/validation](../README.md) / HeartbeatsSchema

# Variable: HeartbeatsSchema

> `const` **HeartbeatsSchema**: `ZodObject`\<\{ `heartbeats`: `ZodArray`\<`ZodObject`\<\{ `ai_line_changes`: `ZodOptional`\<`ZodNumber`\>; `alternate_project`: `ZodOptional`\<`ZodString`\>; `category`: `ZodOptional`\<`ZodEnum`\<\{ `ai coding`: `"ai coding"`; `building`: `"building"`; `code reviewing`: `"code reviewing"`; `debugging`: `"debugging"`; \}\>\>; `cursorpos`: `ZodNumber`; `entity`: `ZodString`; `git_branch`: `ZodOptional`\<`ZodString`\>; `human_line_changes`: `ZodOptional`\<`ZodNumber`\>; `is_unsaved_entity`: `ZodOptional`\<`ZodBoolean`\>; `is_write`: `ZodBoolean`; `language`: `ZodOptional`\<`ZodString`\>; `lineno`: `ZodNumber`; `lines_in_file`: `ZodNumber`; `project_folder`: `ZodOptional`\<`ZodString`\>; `project_root_count`: `ZodOptional`\<`ZodNumber`\>; `time`: `ZodNumber`; \}, `$strip`\>\>; \}, `$strip`\>

Defined in: [src/lib/validation.ts:36](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/validation.ts#L36)
