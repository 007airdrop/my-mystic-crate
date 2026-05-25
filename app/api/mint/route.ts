import { NextRequest, NextResponse } from 'next/server';
import { fetchMintFromTxHash } from '@/lib/fetch-mint';

export async function GET(req: NextRequest) {
  const hash = req.nextUrl.searchParams.get('hash');
  if (!hash || !hash.startsWith('0x')) {
    return NextResponse.json({ ok: false, error: 'Missing hash' }, { status: 400 });
  }

  try {
    const mint = await fetchMintFromTxHash(hash);
    if (!mint) {
      return NextResponse.json({ ok: false, error: 'Could not parse mint' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, mint });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
