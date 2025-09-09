export async function GET() {
  const spec = {
    openapi: '3.0.1',
    info: {
      title: 'Chronos API',
      version: '1.0.0',
      description: 'Simple OpenAPI spec for Chronos',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Current server',
      },
    ],
    paths: {
      '/ping': {
        get: {
          summary: 'Ping',
          description: 'Health check endpoint',
          tags: ['health'],
          responses: {
            '200': {
              description: 'Successful ping',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'number' },
                      message: { type: 'string' },
                    },
                    required: ['status', 'message'],
                    additionalProperties: false,
                  },
                  examples: {
                    success: {
                      summary: 'Connected response',
                      value: { status: 1, message: 'Connected' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
            },
          },
        },
      },
      '/heartbeats': {
        post: {
          summary: 'Submit heartbeats',
          description: 'Accepts a batch of editor/file activity heartbeats.',
          tags: ['ingest'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    heartbeats: {
                      type: 'array',
                      minItems: 1,
                      items: {
                        type: 'object',
                        properties: {
                          timestamp: {
                            oneOf: [{ type: 'number' }, { type: 'string' }],
                          },
                          project: { type: 'string' },
                          language: { type: 'string' },
                          branch: { type: 'string' },
                          machine: { type: 'string' },
                          editor: { type: 'string' },
                          file: { type: 'string' },
                          duration: { type: 'number' },
                        },
                        required: ['timestamp'],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ['heartbeats'],
                  additionalProperties: false,
                },
                examples: {
                  sample: {
                    summary: 'Minimal batch',
                    value: {
                      heartbeats: [
                        { timestamp: 1710000000, project: 'demo', file: 'src/index.ts' },
                      ],
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Accepted and counted',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' },
                      count: { type: 'number' },
                    },
                    required: ['success', 'message', 'count'],
                    additionalProperties: false,
                  },
                  examples: {
                    success: {
                      value: { success: true, message: 'Heartbeats received', count: 1 },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid request body',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      error: { type: 'string' },
                      details: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            path: { type: 'string' },
                            message: { type: 'string' },
                          },
                          required: ['path', 'message'],
                        },
                      },
                    },
                    required: ['success', 'error'],
                    additionalProperties: true,
                  },
                },
              },
            },
          },
        },
      },
      '/summaries': {
        get: {
          summary: 'Get summaries',
          description: 'Returns activity summaries for a given time range.',
          tags: ['summaries'],
          parameters: [
            {
              name: 'start',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Start of range (string, e.g., ISO8601)'.trim(),
            },
            {
              name: 'end',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'End of range (string, e.g., ISO8601)'.trim(),
            },
          ],
          responses: {
            '200': {
              description: 'Summary data returned (placeholder)',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' },
                      text: { type: 'string' },
                      params: {
                        type: 'object',
                        properties: {
                          start: { type: 'string' },
                          end: { type: 'string' },
                        },
                        required: ['start', 'end'],
                      },
                      data: {
                        type: 'object',
                        properties: {
                          total_seconds: { type: 'number' },
                          projects: { type: 'array', items: { type: 'object' } },
                          languages: { type: 'array', items: { type: 'object' } },
                        },
                        required: ['total_seconds', 'projects', 'languages'],
                      },
                    },
                    required: ['success', 'message', 'text', 'params', 'data'],
                    additionalProperties: true,
                  },
                  examples: {
                    placeholder: {
                      value: {
                        success: true,
                        message: 'Summaries request received',
                        text: 'Summaries request received',
                        params: { start: '2024-01-01', end: '2024-01-31' },
                        data: { total_seconds: 0, projects: [], languages: [] },
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid request',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      error: { type: 'string' },
                      details: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            path: { type: 'string' },
                            message: { type: 'string' },
                          },
                          required: ['path', 'message'],
                        },
                      },
                    },
                    required: ['success', 'error'],
                    additionalProperties: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  } as const;

  return Response.json(spec, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
