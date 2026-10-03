import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

// This secret must match what you put in the Sanity dashboard
const secret = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME);
    if (!signature) return new Response('No signature found', { status: 401 });

    const body = await req.text();
    
    // Verify the request actually came from your Sanity database
    if (!isValidSignature(body, signature, secret)) {
      return new Response('Invalid signature', { status: 401 });
    }

    const parsedBody = JSON.parse(body);
    const { _type, slug } = parsedBody;

    // If a post was created, updated, or deleted
    if (_type === 'post') {
      // Revalidate the main blog index to show the new card
      revalidatePath('/blog');
      
      // Revalidate the specific post route if a slug exists
      if (slug?.current) {
        revalidatePath(`/blog/${slug.current}`);
      }
      
      return NextResponse.json({ status: 'success', revalidated: true });
    }

    return NextResponse.json({ status: 'ignored', message: 'Not a post' });
  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
}