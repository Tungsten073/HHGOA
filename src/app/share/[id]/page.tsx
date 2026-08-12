import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Share2 } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://frame-in-goa.vercel.app';

  const imageUrl = process.env.BLOB_READ_WRITE_TOKEN
    ? `https://public.blob.vercel-storage.com/hh-goa-2026/${id}.png`
    : `${domain}/api/share?id=${id}`;

  return {
    title: 'Hacker House Goa 2026 — Builder Pass & Mark',
    description: 'Check out my official Hacker House Goa 2026 Builder Mark & Pass! #FrameInGoa',
    openGraph: {
      title: 'Hacker House Goa 2026 Builder Mark 🌴⚡',
      description: 'Official Decentralized Builder Mark for Hacker House Goa 2026 #FrameInGoa',
      images: [
        {
          url: imageUrl,
          width: 1080,
          height: 1350,
          alt: 'Hacker House Goa 2026 Builder Mark',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Hacker House Goa 2026 Builder Mark 🌴⚡',
      description: 'Official Decentralized Builder Mark for Hacker House Goa 2026 #FrameInGoa',
      images: [imageUrl],
    },
  };
}

export default async function SharePage({ params }: Props) {
  const { id } = await params;
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://frame-in-goa.vercel.app';
  const imageUrl = process.env.BLOB_READ_WRITE_TOKEN
    ? `https://public.blob.vercel-storage.com/hh-goa-2026/${id}.png`
    : `/api/share?id=${id}`;

  const shareText = encodeURIComponent(
    'I just generated my Builder Mark for Hacker House Goa 2026! 🚀🌴\n\nBuilding in Goa this October! #FrameInGoa'
  );
  const sharePageUrl = encodeURIComponent(`${domain}/share/${id}`);
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
            <span>HHG.26 // ID VERIFIED</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#151B2B]">
            BUILDER MARK READY
          </h1>
          <p className="text-xs font-mono tracking-widest uppercase text-[#151B2B]/70 max-w-md mx-auto">
            OFFICIAL GRAPHIC FOR HACKER HOUSE GOA 2026 #FrameInGoa
          </p>
        </div>

        {/* Image Display */}
        <div className="w-full max-w-xl bg-[#151B2B] p-2 border-2 border-[#151B2B] shadow-brutal-lg">
          <img
            src={imageUrl}
            alt="Hacker House Goa 2026 Graphic"
            className="w-full h-auto object-contain"
          />
        </div>

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
