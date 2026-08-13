import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Share2 } from 'lucide-react';
import { ShareCardImage } from '@/components/share/ShareCardImage';

interface Props {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ name?: string; title?: string; stack?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const sParams = searchParams ? await searchParams : {};
  
  const name = sParams.name ? decodeURIComponent(sParams.name) : 'Builder';
  const title = sParams.title ? decodeURIComponent(sParams.title) : 'Hacker House Goa 2026';
  const stack = sParams.stack ? decodeURIComponent(sParams.stack) : '';

  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://frame-in-goa.vercel.app';
  const imageUrl = process.env.BLOB_READ_WRITE_TOKEN
    ? `https://public.blob.vercel-storage.com/hh-goa-2026/${id}.png`
    : `${domain}/api/share?id=${id}`;

  const pageTitle = `${name} — ${title} | Hacker House Goa 2026`;
  const pageDesc = stack
    ? `Check out ${name}'s Official Builder Pass for Hacker House Goa 2026! Stack: ${stack} · #FrameInGoa`
    : `Check out ${name}'s Official Builder Pass for Hacker House Goa 2026! #FrameInGoa`;

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      images: [
        {
          url: imageUrl,
          width: 1080,
          height: 1350,
          alt: `Hacker House Goa 2026 Builder Mark for ${name}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [imageUrl],
    },
  };
}

export default async function SharePage({ params, searchParams }: Props) {
  const { id } = await params;
  const sParams = searchParams ? await searchParams : {};
  const name = sParams.name ? decodeURIComponent(sParams.name) : '';
  const title = sParams.title ? decodeURIComponent(sParams.title) : '';
  const stack = sParams.stack ? decodeURIComponent(sParams.stack) : '';

  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://frame-in-goa.vercel.app';
  const imageUrl = process.env.BLOB_READ_WRITE_TOKEN
    ? `https://public.blob.vercel-storage.com/hh-goa-2026/${id}.png`
    : `/api/share?id=${id}`;

  let shareQuery = '';
  if (name || title || stack) {
    shareQuery = `?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&stack=${encodeURIComponent(stack)}`;
  }

  const nameLine = name ? `👤 Name: ${name}\n` : '';
  const titleLine = title ? `⚡ Title: ${title}\n` : '';
  const stackLine = stack ? `🛠️ Stack: ${stack}\n` : '';

  const shareText = encodeURIComponent(
    `I just generated my Builder Mark for Hacker House Goa 2026! 🚀🌴\n\n${nameLine}${titleLine}${stackLine}Building in Goa this October! #FrameInGoa #HackerHouseGoa`
  );
  const sharePageUrl = encodeURIComponent(`${domain}/share/${id}${shareQuery}`);
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${sharePageUrl}`;

  return (
    <main className="min-h-screen bg-[#FDF9F0] text-[#151B2B] flex flex-col items-center justify-center p-4 relative overflow-hidden bg-technical-grid font-syne">
      {/* Background Topographic Overlay */}
      <div className="absolute inset-0 bg-topographic z-0 opacity-40 mix-blend-multiply pointer-events-none" />

      <div className="max-w-3xl w-full flex flex-col items-center space-y-6 z-10 py-12">
        <Link
          href="/"
          className="self-start inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#151B2B] bg-[#F5F1E8] px-4 py-2 border-2 border-[#151B2B] shadow-brutal hover:bg-[#9F452D] hover:text-[#F5F1E8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← BACK TO MARK GENERATOR</span>
        </Link>

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F5F1E8] border-2 border-[#151B2B] text-[#9F452D] text-xs font-mono font-bold uppercase tracking-widest shadow-brutal">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HHG.26 // ARTIFACT READY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#151B2B]">
            {name ? `${name.toUpperCase()}'S BUILDER MARK` : 'BUILDER MARK READY'}
          </h1>
          <p className="text-xs font-mono tracking-widest uppercase text-[#151B2B]/70 max-w-md mx-auto">
            {title ? `${title} · ${stack || 'HHG.26'}` : 'GENERATED ARTIFACT FOR HACKER HOUSE GOA 2026 #FrameInGoa'}
          </p>
        </div>

        {/* Resilient Client Image Component displaying ID Photo */}
        <ShareCardImage shareId={id} initialImageUrl={imageUrl} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2">
          <a
            href={twitterIntentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-[#9F452D] text-[#F5F1E8] font-mono font-bold uppercase tracking-wider px-6 py-3.5 border-2 border-[#151B2B] shadow-brutal hover:bg-[#151B2B] transition-all text-xs text-center"
          >
            <Share2 className="w-4 h-4 fill-current" />
            <span>SHARE TO X (#FrameInGoa)</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-[#151B2B] text-[#F5F1E8] font-mono font-bold uppercase tracking-wider px-6 py-3.5 border-2 border-[#151B2B] shadow-brutal hover:bg-[#9F452D] transition-all text-xs text-center"
          >
            <span>BUILD YOUR MARK</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
