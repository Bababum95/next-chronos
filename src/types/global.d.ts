import type mo from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mo | null;
    promise: Promise<typeof mo> | null;
  };
}
