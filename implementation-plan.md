# Technical Implementation Plan - HH Goa 2026 ID & Frame Generator

## 1. System Architecture

```
                                +------------------------+
                                |  Next.js 14 / React 18 |
                                |   App Router Frontend  |
                                +-----------+------------+
                                            |
                 +--------------------------+--------------------------+
                 |                                                     |
    +------------v------------+                               +--------v---------------+
    | React State & Controls  |                               | Canvas Render Engine   |
    |  - User Profile Data    |                               |  - Offscreen Canvas    |
    |  - Image Controls       |======= Render Pipeline =======>  - Template Compositor  |
    |  - Theme Selection      |                               |  - High-Res Export     |
    +-------------------------+                               +--------+---------------+
                                                                       |
                                                              +--------v---------------+
                                                              | Export Handlers        |
                                                              |  - PNG (2K / 4K)       |
                                                              |  - PDF Badges          |
                                                              +------------------------+
```

---

## 2. Directory & Component Structure
```
~/Projects/HH-Goa-2026/
├── app/                      # Next.js App Router codebase (to be initialized)
├── docs/                     # Project documentation & framework specifications
│   └── shortlisting-task.md   # Copy of task details & rubric
├── assets/                   # High-res vector templates, badges, overlays, logo assets
├── tests/                    # Unit, integration, & rendering snapshot test files
├── README.md                 # Project README with setup & developer guide
├── requirements.md           # Product & technical requirements specification
├── implementation-plan.md    # Technical architecture & roadmap document
└── .gitignore                # Git ignore rules for Next.js/Vercel/Node
```

---

## 3. Technology Stack & Dependencies

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14+ (TypeScript) | UI framework, App Router, SSR/Static Generation |
| **Styling** | Vanilla CSS / CSS Modules | Modern aesthetics, glassmorphism, responsive design |
| **Graphics Engine** | HTML5 Canvas API + `html-to-image` / `canvas` | Zero-dependency high-resolution export |
| **QR Code** | `qrcode` | Client-side dynamic QR code generation |
| **Icons & Fonts** | Lucide React + Google Fonts (Inter / Outfit) | Modern visual assets & typography |
| **Testing** | Vitest / Playwright | Unit testing canvas functions & E2E verification |

---

## 4. Key Functional Modules

### Module 1: Image Upload & Manipulation Pipeline
- File input listener with drag-and-drop support.
- Image cropping, scale multiplier (`0.5x` - `3.0x`), translation offset (`dx`, `dy`), rotation degrees (`0°` - `360°`).
- CSS/Canvas filter pipeline for real-time contrast, saturation, and cyber-glow adjustments.

### Module 2: Template Compositor Engine
- Canvas rendering queue:
  1. Base canvas background / theme frame.
  2. Filtered user profile photograph (clipped to circle or rounded rect).
  3. Frame overlay / border graphics (Hacker House Goa branding).
  4. Typography layer (Name, Role, Handle, Track).
  5. QR Code overlay & verified participant badge.

### Module 3: High-Res Export Engine
- Canvas upscale transformation to 2048x2048px (PNG 2K).
- PDF generation using jsPDF / Canvas blob conversion.
- Direct Twitter / LinkedIn sharing link generator with hashtags.

---

## 5. Development Roadmap & Execution Phases
- **Phase 1: Project & Architecture Setup** (Current Phase - Environment isolation & docs).
- **Phase 2: App Initialization & UI Shell** (Next.js scaffold, Design system, Layout).
- **Phase 3: Canvas Processing Engine** (Photo upload, pan/zoom/rotate, live preview).
- **Phase 4: Template Customizer & QR Generator** (Theme switcher, role badges, metadata inputs).
- **Phase 5: Export & Polish** (2K PNG download, PDF print guide, Twitter share).
- **Phase 6: Testing & Verification** (Unit tests for canvas math & render state).
