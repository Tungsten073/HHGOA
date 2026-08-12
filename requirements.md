# Hacker House Goa 2026 - Shortlisting Task Requirements

## Project Title
**Hacker House Goa 2026 Frame / ID Card Generator**

---

## 1. Executive Summary & Objective
The objective of this task is to build a high-performance, visually captivating, and fully client-side web application for generating official Hacker House Goa 2026 dynamic avatars, digital ID cards, social frames, and event badges. The generator allows shortlisted participants, mentors, speakers, and sponsors to create personalized social media branding assets in seconds.

---

## 2. Selection Framework Alignment
Candidates submitting this project are evaluated based on the official **Hacker House Goa 2026 Selection Framework**:

1. **UI/UX Excellence & Polish (30%)**:
   - Modern, high-end aesthetics (glassmorphism, vibrant neon gradients, sleek dark mode).
   - Smooth micro-interactions, drag-and-drop mechanics, and responsive design across all viewports.
2. **Technical Architecture & Performance (30%)**:
   - High-speed canvas-based graphics processing without server roundtrips.
   - Modular, maintainable React/Next.js component structure.
   - Clean state management and asset pipeline.
3. **Feature Completeness & Flexibility (25%)**:
   - Multiple badge modes (Square Avatar, Story 9:16, Printable ID Badge 3:4).
   - Real-time photo manipulation (crop, scale, pan, rotate, filters).
   - Custom field customization (Name, Role, Handle, QR Code, Track/Tech Stack).
   - High-resolution PNG and PDF exports.
4. **Developer Experience & Code Quality (15%)**:
   - Strict TypeScript typing, clear folder architecture, documentation, automated testing strategy.

---

## 3. Core Functional Requirements

### 3.1 Profile Photo Processing
- **Upload & Drag-and-Drop**: Support PNG, JPG, WebP formats up to 10MB.
- **Interactive Editing Canvas**:
  - Zoom / Scale control (0.5x to 3x).
  - Panning / Position adjustment (X, Y offset).
  - Rotation (90° step + fine angle rotation).
  - Image Filters (Brightness, Contrast, Saturation, Sepia, Grayscale, Cyber Glow).

### 3.2 Dynamic Template & Frame Selection
- **Themes**:
  - *Neon Cyberpunk* (Electric Cyan & Neon Purple gradient overlays).
  - *Tropical Goa Sunset* (Warm Palm Beach orange & deep ocean teal accents).
  - *Sleek Obsidian Dark* (Minimalist matte black with glowing gold highlights).
  - *Glassmorphic Builder Badge* (Frosted glass card with metallic borders).
- **Preset Formats**:
  - **Social Avatar (1:1)** - 1080x1080px (Twitter/X, GitHub, Discord profile photo).
  - **Social Post / Story (9:16)** - 1080x1920px (Instagram, LinkedIn Story).
  - **Printable ID Badge (3:4)** - 300 DPI layout for physical printing with lanyard hole guides.

### 3.3 Personalized Card Details
- **User Metadata Input**:
  - Full Name (with font autosizing for long names).
  - Role / Designation (e.g. `Hacker`, `AI Architect`, `Web3 Builder`, `Speaker`, `Mentor`, `Organizer`).
  - GitHub / X Handle (`@username`).
  - Track / Focus Area (`AI & Agents`, `DeFi & Solana`, `Zero Knowledge`, `Mobile & UX`).
- **Dynamic QR Code Generator**:
  - Automatic QR code rendering linking to user's specified URL/Handle.
  - Custom branding element embedded in the center of the QR code.

### 3.4 High-Resolution Export Engine
- **Formats**: PNG (2K resolution), WebP, PDF.
- **Client-Side Rendering**: Instant generation using HTML5 Canvas / Web Canvas rendering to prevent latency.
- **Social Sharing**: One-click download + "Share on Twitter / X" button with pre-filled event hashtags `#HHGoa2026` `#HackerHouseGoa`.

---

## 4. Non-Functional Requirements
- **Performance**: Canvas render time < 50ms per state change.
- **Security & Privacy**: Client-side execution; user images are never uploaded to any external server.
- **Accessibility**: Keyboard navigable controls, contrast-compliant text overlays, ARIA labels.
- **Responsiveness**: Fully functional on desktop, tablet, and mobile browsers.

---

## 5. Verification & Acceptance Criteria
- [ ] Directory isolated in `~/Projects/HH-Goa-2026`.
- [ ] All code strictly adheres to clean Next.js/React standard structures.
- [ ] Requirements fully documented and implementation plan established.
- [ ] Unit and end-to-end test framework configured.
