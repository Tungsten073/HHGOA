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
    title: 'Hacker House Goa 2026 — Builder Pass',
    description: 'Check out my official Hacker House Goa 2026 Builder Pass! Generated for #FrameInGoa.',
    openGraph: {
      title: 'Hacker House Goa 2026 Builder Pass 🌴⚡',
      description: 'Official Builder Pass for Hacker House Goa 2026 #FrameInGoa',
      images: [
        {
          url: imageUrl,
          width: 1080,
          height: 1350,
          alt: 'Hacker House Goa 2026 Builder Pass',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Hacker House Goa 2026 Builder Pass 🌴⚡',
      description: 'Official Builder Pass for Hacker House Goa 2026 #FrameInGoa',
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
    'I just generated my Builder Pass for Hacker House Goa 2026! 🚀🌴\n\nBuilding in Goa this October! #FrameInGoa'
  );
  const sharePageUrl = encodeURIComponent(`${domain}/share/${id}`);
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${sharePageUrl}`;

  return (
    <main className="min-h-screen bg-[#0b1a15] text-emerald-100 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-editorial-grid">
      <div className="max-w-3xl w-full flex flex-col items-center space-y-6 z-10">
        <Link 
          href="/" 
          className="self-start inline-flex items-center space-x-2 text-sm text-amber-300 hover:text-amber-200 transition-colors bg-emerald-950/80 px-4 py-2 rounded-full border border-emerald-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Create Your Own Frame</span>
        </Link>

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hacker House Goa 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight gradient-text-hh font-display">
            Builder Pass & Frame
          </h1>
          <p className="text-sm text-emerald-200/70 max-w-md mx-auto">
            Generated graphic for Hacker House Goa 2026 submission #FrameInGoa.
          </p>
        </div>

        {/* Image Display */}
        <div className="w-full canvas-wrapper max-w-xl bg-emerald-950 p-2 border border-emerald-800 shadow-2xl">
          <img 
            src={imageUrl} 
            alt="Hacker House Goa 2026 Graphic" 
            className="w-full h-auto rounded-lg object-contain"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2">
          <a
            href={twitterIntentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 gradient-btn-hh font-black px-6 py-3.5 rounded-xl text-center text-sm shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Share2 className="w-4 h-4 fill-current" />
            <span>Share This Pass to X</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-bold px-6 py-3.5 rounded-xl text-center text-sm border border-emerald-700 transition-all"
          >
            <span>Build Your Frame</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
