# 🌴 Hacker House Goa 2026 — HHG.26 Builder Mark & ID Generator

Official Decentralized Builder Mark, Social PFP Frame, and Builder ID Pass Generator for **Hacker House Goa 2026** (`HHG.26` / `Batch 247`).

**GitHub Repository:** [https://github.com/Tungsten073/HHGOA](https://github.com/Tungsten073/HHGOA)  
**Event Tagline:** *The Road to 247*  
**Hashtag:** `#FrameInGoa`  
**Coordinates:** `15.4909° N, 73.8278° E (Goa, India)`

---

## 🌟 Executive Overview

**Hacker House Goa 2026** is a consumer-grade, high-performance web application designed for builders, engineers, designers, and founders participating in Hacker House Goa. It allows attendees to create personalized, high-resolution social media overlays (`1080×1080`) and digital Builder ID Passes (`1080×1350`), rendered via HTML5 Canvas and presented through an interactive 3D WebGL artifact layer.

---

## 🗺️ Application Architecture & User Flow

```
                                  [ USER ENTERS APPLICATION ]
                                               │
                                               ▼
                                    ┌──────────────────────┐
                                    │    Top Navigation    │
                                    │  EVENT | ID | GALLERY│
                                    └──────────┬───────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
    ┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
    │  EVENT LANDING PAGE │         │ GENERATOR WORKSPACE │         │   ARCHIVE ACCESS    │
    │  • 3-Column Layout  │         │  • Photo Upload     │         │   GALLERY           │
    │  • Metadata Badges  │         │  • Customization    │         │  • Builder Directory│
    │  • INITIATE SEQUENCE│         │  • Direct Drag/Zoom │         │  • Interactive Cards│
    └──────────┬──────────┘         └──────────┬──────────┘         └──────────┬──────────┘
               │                               │                               │
               └───────────────────────────────┼───────────────────────────────┘
                                               │
                                               ▼
                                  ┌──────────────────────────┐
                                  │   IMAGE INPUT PROCESS    │
                                  │  (JPG, PNG, iPhone HEIC) │
                                  └────────────┬─────────────┘
                                               │
                                               ▼
                                  ┌──────────────────────────┐
                                  │   CLIENT-SIDE HEIC       │
                                  │   CONVERSION (heic2any)  │
                                  └────────────┬─────────────┘
                                               │
                                               ▼
                                  ┌──────────────────────────┐
                                  │  HTML5 CANVAS ENGINE     │
                                  │  • 1080×1080 PFP Frame   │
                                  │  • 1080×1350 Builder ID  │
                                  └────────────┬─────────────┘
                                               │
                       ┌───────────────────────┴───────────────────────┐
                       ▼                                               ▼
           ┌───────────────────────┐                       ┌───────────────────────┐
           │ 2D HIGH-RES OUTPUT    │                       │  3D INTERACTIVE LAYER │
           │  • Canvas Render      │                       │  • Three.js R3F Mesh  │
           │  • Pointer Drag (1:1) │                       │  • Mouse Tilt & Float │
           │  • Zoom Control       │                       │  • WebGL Fallback     │
           └──────────┬────────────┘                       └───────────┬───────────┘
                      │                                                │
                      └────────────────────────┬───────────────────────┘
                                               │
                                               ▼
                                  ┌──────────────────────────┐
                                  │   EXPORT & SOCIAL SHARE  │
                                  │  • Download PNG (HighRes)│
                                  │  • Vercel Blob Upload    │
                                  │  • Twitter/X Web Intent  │
                                  │  • OpenGraph Social Card │
                                  └──────────────────────────┘
```

---

## 🔥 Key Features & Capabilities

### 1. Dual Canvas Output Formats
- **Format A: PFP Overlay (`1080 × 1080 px`)**: Square profile frame optimized for Twitter/X, GitHub, and Telegram avatars.
- **Format B: Builder ID Pass (`1080 × 1350 px`, 4:5 Aspect Ratio)**: Vertical editorial builder pass featuring applicant name, tech stack, builder title, coordinate metadata, and batch code `247`.

### 2. Direct Canvas Image Manipulation
- **Direct 1:1 Canvas Dragging**: Drag the uploaded photo directly inside the canvas container to adjust cropping. Uses exact canvas-to-client coordinate scaling.
- **Touch-Friendly Zoom Slider**: Smooth scaling from `50%` to `250%` with an instant `RESET` control.

### 3. iPhone HEIC / HEIF & Multi-Format Support
- Automatic client-side conversion of Apple iPhone **HEIC/HEIF** photos to JPEG format via dynamic import of `heic2any`.
- Native support for standard **JPG, JPEG, PNG, and WebP** files up to 10MB.

### 4. Interactive 3D WebGL Presentation Layer
- **3D Hero Artifact (`HHGoaHero3D`)**: Floating 3D rectangular builder mark artifact with custom 2D canvas textures and cursor tilt interaction (lerp spring physics).
- **3D Builder Pass Preview (`BuilderCard3D`)**: Renders the generated 2D HTML Canvas output directly onto a 3D pass object in real time.
- **WebGL Fallback**: Gracefully detects WebGL availability and renders `WebGLFallback` if hardware acceleration is disabled.
- **Reduced Motion Support**: Evaluates `prefers-reduced-motion: reduce` to disable automatic rotation and pointer tilt for accessibility.

### 5. High-Contrast Terminal Tropic Visual Identity
- **Design Aesthetic**: Editorial brutalism combining terminal utility with tropical Goa motifs.
- **Palette**: Dark Ink (`#151B2B`), Warm Cream (`#F5F1E8`), Burnt Orange (`#9F452D`), Palm Green (`#315746`), Warm Yellow (`#D8A928`).
- **Typography**: Avant-garde display typography in `Syne` and utilitarian technical metadata in `JetBrains Mono`.

### 6. One-Click Social Sharing & Vercel Blob Integration
- **Download High-Res PNG**: Triggers raw 2D Canvas download with instant celebration confetti.
- **Share to X (`#FrameInGoa`)**: Encodes image data, uploads to Vercel Blob storage (`/api/share`), generates a shareable link (`/share/[id]`), and launches Twitter Web Intent.
- **OpenGraph Card Previews**: `/share/[id]` dynamic page includes full OpenGraph and Twitter `summary_large_image` metadata tags for social link previews.

---

## 🎨 Design System: Terminal Tropic

| Token | Hex / Value | Application |
|---|---|---|
| **Background / Surface** | `#FDF9F0` | Main canvas background |
| **Cream** | `#F5F1E8` | Card background & contrast elements |
| **Primary Ink** | `#151B2B` | Borders, primary typography, dark badges |
| **Burnt Orange** | `#9F452D` | Primary accent, primary CTA buttons |
| **Palm Green** | `#315746` | Secondary accent & tech role highlights |
| **Warm Yellow** | `#D8A928` | Taglines & 3D light highlights |
| **Display Font** | `Syne` | Headlines, title cards, bold labels |
| **Monospace Font** | `JetBrains Mono` | Coordinates, badges, terminal inputs |
| **Borders** | `2px solid #151B2B` | Brutalist container lines |
| **Shadows** | `4px 4px 0px #151B2B` | Brutalist offset hard shadows |

---

## 📁 Repository Directory Structure

```
HH-Goa-2026/
├── public/                     # Static assets (favicons, SVG badges)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── share/
│   │   │       └── route.ts    # POST: Vercel Blob upload / GET: In-memory fallback
│   │   ├── share/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Dynamic OpenGraph Social Share Preview page
│   │   ├── globals.css         # Tailwind CSS v4 design tokens & background textures
│   │   ├── layout.tsx          # Root layout with Google Fonts (Syne & JetBrains Mono)
│   │   └── page.tsx            # Main application workspace & tab router
│   │
│   ├── components/
│   │   ├── three/
│   │   │   ├── BuilderCard3D.tsx # Phase 2: 3D generated card texture presentation
│   │   │   ├── HHGoaHero3D.tsx   # Phase 1: 3D floating hero artifact card
│   │   │   ├── Scene.tsx         # R3F Canvas wrapper & WebGL Error Boundary
│   │   │   └── WebGLFallback.tsx # 2D fallback component when WebGL is unavailable
│   │   │
│   │   ├── AdjustmentControls.tsx # Touch zoom slider & Reset button
│   │   ├── BuilderForm.tsx     # Stack/Role selector & name/title input form
│   │   ├── DownloadShareActions.tsx # Download PNG, Share to X, Copy Link buttons
│   │   ├── FormatSelector.tsx  # Format A (PFP) vs Format B (Builder ID) toggle
│   │   ├── FrameCanvas.tsx     # 2D HTML5 Canvas rendering & direct pointer drag
│   │   ├── Header.tsx          # Top navigation bar & Event Landing Page header
│   │   ├── ImageUploader.tsx   # Drag-and-drop photo upload & HEIC converter
│   │   └── TitleGenerator.tsx  # Random Builder Title generator button
│   │
│   ├── constants/
│   │   ├── templates.ts        # Theme configurations (Palm, Sunset, Volt, Ocean) & canvas dimensions
│   │   └── titles.ts           # Builder title registries by tech stack
│   │
│   ├── lib/
│   │   ├── canvas/
│   │   │   ├── canvasUtils.ts    # Rounded rect & cover image fitting algorithms
│   │   │   ├── drawBuilderCard.ts # 1080×1350 Builder ID 2D canvas renderer
│   │   │   └── drawPfpFrame.ts    # 1080×1080 PFP Frame 2D canvas renderer
│   │   └── utils/
│   │       ├── downloadHelper.ts # Canvas PNG export utility
│   │       └── heicConverter.ts  # Client-side HEIC -> JPEG converter
│   │
│   └── types/
│       └── index.ts            # TypeScript interface declarations
│
├── docs/                       # Task specifications & requirements documentation
├── next.config.ts              # Next.js configuration
├── package.json                # Dependency manifest
├── tsconfig.json               # TypeScript compiler config
└── README.md                   # Project documentation
```

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript (Strict type checking)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Utilities
- **3D Graphics Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Canvas Engine**: HTML5 2D Context (`CanvasRenderingContext2D`)
- **HEIC Conversion**: `heic2any`
- **Cloud Storage**: `@vercel/blob`
- **UI Icons & Animations**: `lucide-react`, `canvas-confetti`

---

## 🚦 Local Development Guide

### Prerequisites
- Node.js >= `18.17.0`
- npm >= `9.0.0`

### 1. Clone Repository
```bash
git clone https://github.com/Tungsten073/HHGOA.git
cd HHGOA
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Type Check & Production Build
```bash
# Run TypeScript compiler check
npx tsc --noEmit

# Build production bundle
npm run build
```

---

## 🌐 Environment Variables (Optional for Cloud Blob Storage)

To enable persistent Vercel Blob cloud storage for share links in production, create a `.env.local` file:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

*Note: If `BLOB_READ_WRITE_TOKEN` is omitted during local development, the app automatically falls back to in-memory image storage.*

---

## 📜 License & Accreditation

Created for **Hacker House Goa 2026** (`HHG.26` / `Batch 247`).  
Developed with 🧡 for the global hacker and builder community. #FrameInGoa
