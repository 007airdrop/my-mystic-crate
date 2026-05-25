import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export async function GET() {
  const buf = await readFile(join(process.cwd(), 'public', 'app-icon.png'));
  return new Response(buf, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
