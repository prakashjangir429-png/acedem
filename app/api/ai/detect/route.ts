import { NextResponse } from 'next/server';
import { sameOrigin } from '@/lib/admin';
import { allowAiRequest, callZeroGpt, hasZeroGptCredentials, parseTextRequest, textInput } from '@/lib/zero-gpt';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  if (!allowAiRequest(request)) return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  const parsed = textInput.safeParse(await parseTextRequest(request));
  if (!parsed.success) return NextResponse.json({ error: 'Enter between 30 and 10,000 characters.' }, { status: 400 });
  if (!hasZeroGptCredentials()) return NextResponse.json({ error: 'AI detection is awaiting authorized ZeroGPT business API credentials.' }, { status: 503 });
  try {
    const data = await callZeroGpt('/api/detect/detectText', { input_text: parsed.data.text });
    return NextResponse.json({
      aiPercentage: typeof data.fakePercentage === 'number' ? data.fakePercentage : null,
      aiWords: typeof data.aiWords === 'number' ? data.aiWords : null,
      textWords: typeof data.textWords === 'number' ? data.textWords : null,
      feedback: typeof data.feedback === 'string' ? data.feedback : '',
      highlightedSentences: Array.isArray(data.h) ? data.h.filter((value): value is string => typeof value === 'string').slice(0, 30) : [],
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'The text service is unavailable.' }, { status: 502 });
  }
}
