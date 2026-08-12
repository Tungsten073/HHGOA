import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// In-memory fallback map for local development when BLOB_READ_WRITE_TOKEN is not set
const localImageStore = new Map<string, string>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64 } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing image data' },
        { status: 400 }
      );
    }

    // Generate unique ID for share link
    const shareId = 'hh-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    
    // Extract base64 data & mime type
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json(
        { success: false, error: 'Invalid image format' },
        { status: 400 }
      );
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    let imageUrl = '';

    // Check if Vercel Blob token exists
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`hh-goa-2026/${shareId}.png`, imageBuffer, {
        contentType,
        access: 'public',
      });
      imageUrl = blob.url;
    } else {
      // Local development fallback: store in memory map
      localImageStore.set(shareId, imageBase64);
      imageUrl = `/api/share/image/${shareId}`;
    }

    const origin = req.headers.get('origin') || req.headers.get('host') || 'https://frame-in-goa.vercel.app';
    const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;
    const shareUrl = `${baseUrl}/share/${shareId}`;

    return NextResponse.json({
      success: true,
      shareId,
      shareUrl,
      imageUrl,
    });
  } catch (error) {
    console.error('API /api/share error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process share request' },
      { status: 500 }
    );
  }
}

// Handler to serve stored images during local fallback testing
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const shareId = url.searchParams.get('id');

  if (shareId && localImageStore.has(shareId)) {
    const base64Data = localImageStore.get(shareId)!;
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches) {
      const contentType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  }

  return NextResponse.json({ error: 'Image not found' }, { status: 404 });
}
