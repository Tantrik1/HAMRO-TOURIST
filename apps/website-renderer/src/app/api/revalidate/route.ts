import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { secret, paths } = body;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid secret' } },
      { status: 401 },
    );
  }

  const revalidatedPaths: string[] = [];
  const targetPaths = paths?.length ? paths : ['/'];

  for (const path of targetPaths) {
    revalidatePath(path);
    revalidatedPaths.push(path);
  }

  return NextResponse.json({
    success: true,
    data: { revalidated: true, paths: revalidatedPaths, timestamp: Date.now() },
  });
}
