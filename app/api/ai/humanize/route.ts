import { NextResponse } from 'next/server';
import { sameOrigin } from '@/lib/admin';
import { allowAiRequest, callZeroGpt, hasZeroGptCredentials, humanizeInput, parseTextRequest } from '@/lib/zero-gpt';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  if (!allowAiRequest(request)) return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  const parsed = humanizeInput.safeParse(await parseTextRequest(request));
  if (!parsed.success) return NextResponse.json({ error: 'Enter valid text and options (30–10,000 characters).' }, { status: 400 });
  const token = process.env.ZERO_GPT_HUMANIZER_TOKEN;
  const endpoint = process.env.ZERO_GPT_HUMANIZER_API_URL;
  if (!endpoint || (!token && !hasZeroGptCredentials())) return NextResponse.json({ error: 'Humanizing requires an authorized ZeroGPT humanizer endpoint and business API credentials.' }, { status: 503 });
  try {
    const data = await callZeroGpt(endpoint, {
      string: parsed.data.text,
      skipRealtime: 1,
      humanizerReadability: parsed.data.readability,
      humanizerPurpose: parsed.data.purpose,
      humanizerStrength: parsed.data.strength,
      humanizerModel: 'v11',
    }, token);
    if (typeof data.output !== 'string') throw new Error('The text service returned an unexpected result.');
    return NextResponse.json({ output: data.output });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'The text service is unavailable.' }, { status: 502 });
  }
}
