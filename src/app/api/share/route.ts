import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// In-memory fallback map for local development when BLOB_READ_WRITE_TOKEN is not set
const localImageStore = new Map<string, string>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, builderData } = body;

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
      // Local development / fallback storage in memory map
      localImageStore.set(shareId, imageBase64);
      imageUrl = `/api/share?id=${shareId}`;
    }

    const origin = req.headers.get('origin') || req.headers.get('host') || 'https://frame-in-goa.vercel.app';
    const baseUrl = origin.startsWith('http') ? origin : `https://${origin}`;
    
    let queryParams = '';
    if (builderData) {
      const qName = builderData.name ? encodeURIComponent(builderData.name) : '';
      const qTitle = builderData.title ? encodeURIComponent(builderData.title) : '';
      const qStack = builderData.stack ? encodeURIComponent(builderData.stack) : '';
      queryParams = `?name=${qName}&title=${qTitle}&stack=${qStack}`;
    }

    const shareUrl = `${baseUrl}/share/${shareId}${queryParams}`;

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

// Handler to serve stored images or fallback graphic
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

  // Elegant SVG fallback card so broken image icon is NEVER rendered
  const fallbackSvg = `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1350" fill="#111827"/>
  <rect x="40" y="40" width="1000" height="1270" fill="none" stroke="#E2B93B" stroke-width="4"/>
  <text x="540" y="520" font-family="sans-serif" font-size="64" font-weight="900" fill="#F5F1E8" text-anchor="middle">HACKER HOUSE GOA 2026</text>
  <text x="540" y="620" font-family="sans-serif" font-size="44" font-weight="700" fill="#E2B93B" text-anchor="middle">BUILDER MARK ARTIFACT</text>
  <text x="540" y="720" font-family="monospace" font-size="30" fill="#F5F1E8" opacity="0.85" text-anchor="middle">THE ROAD TO 247 · #FRAMEINGOA</text>
  <text x="540" y="860" font-family="monospace" font-size="28" font-weight="bold" fill="#A9482E" text-anchor="middle">GOA, INDIA · 28—31 OCTOBER 2026</text>
</svg>`;

  return new NextResponse(fallbackSvg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
