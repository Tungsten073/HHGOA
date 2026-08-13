import { BuilderData, FrameTheme, TransformState } from '@/types';
import { THEME_CONFIGS, ID_CARD_WIDTH, ID_CARD_HEIGHT, EVENT_DETAILS } from '@/constants/templates';
import { drawCoverImage, drawRoundedRect, drawBadge } from './canvasUtils';

export function drawBuilderCard(
  canvas: HTMLCanvasElement,
  userImage: HTMLImageElement | null,
  builderData: BuilderData,
  theme: FrameTheme = 'editorial',
  transform: TransformState = { scale: 1, offsetX: 0, offsetY: 0 }
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = ID_CARD_WIDTH;   // 1080 px
  const height = ID_CARD_HEIGHT; // 1350 px (4:5 portrait)
  canvas.width = width;
  canvas.height = height;

  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.editorial;

  // 1. Overall Dark Editorial Background
  ctx.fillStyle = themeConfig.bgColor;
  ctx.fillRect(0, 0, width, height);

  // Geometric Grid Overlay
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  const gridStep = 60;
  for (let x = 0; x < width; x += gridStep) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Main Builder Pass Card Outer Container
  const margin = 48;
  const cardW = width - margin * 2;   // 984 px
  const cardH = height - margin * 2;  // 1254 px
  const cardX = margin;
  const cardY = margin;

  ctx.save();
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 32);
  ctx.fillStyle = themeConfig.cardBg;
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = themeConfig.borderColor;
  ctx.stroke();
  ctx.restore();

  // 3. Header Section inside Card
  const headerY = cardY + 50;
  const headerX = cardX + 48;

  // Batch / Code Tag "247"
  ctx.save();
  ctx.fillStyle = themeConfig.secondaryColor;
  ctx.font = '900 18px "Fira Code", monospace';
  ctx.fillText('BATCH 247  ·  GOA, INDIA', headerX, headerY);

  // Main Headline Typography
  ctx.fillStyle = themeConfig.textColor;
  ctx.font = '900 48px "Outfit", system-ui, sans-serif';
  ctx.fillText(EVENT_DETAILS.name, headerX, headerY + 48);

  ctx.fillStyle = themeConfig.mutedTextColor;
  ctx.font = '700 20px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(EVENT_DETAILS.dates, headerX, headerY + 84);
  ctx.restore();

  // 4. Central Photo Container
  const photoX = headerX;
  const photoY = headerY + 115;
  const photoW = cardW - 96; // 888 px
  const photoH = 540;        // 540 px photo frame

  ctx.save();
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 24);
  ctx.clip();

  if (userImage) {
    drawCoverImage(ctx, userImage, photoX, photoY, photoW, photoH, transform);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(photoX, photoY, photoW, photoH);

    ctx.fillStyle = '#64748b';
    ctx.font = '700 32px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BUILDER PHOTO', photoX + photoW / 2, photoY + photoH / 2);
  }
  ctx.restore();

  // Photo Frame Border
  ctx.save();
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 24);
  ctx.lineWidth = 4;
  ctx.strokeStyle = themeConfig.primaryColor;
  ctx.stroke();
  ctx.restore();

  // 5. Builder Profile Details Section (Below Photo)
  const infoY = photoY + photoH + 45;

  // Neutral Event Status Badge (NO "SHORTLISTED")
  ctx.save();
  drawBadge(
    ctx,
    'BUILDER',
    photoX,
    infoY,
    themeConfig.badgeBg,
    themeConfig.badgeText,
    themeConfig.primaryColor
  );

  // Stack Tag Badge
  drawBadge(
    ctx,
    builderData.stack || 'Solana / Web3',
    photoX + 130,
    infoY,
    'rgba(0, 0, 0, 0.08)',
    themeConfig.textColor,
    themeConfig.mutedTextColor
  );
  ctx.restore();

  // Builder Name
  const nameY = infoY + 85;
  const builderName = builderData.name.trim() ? builderData.name : 'YOUR NAME';

  ctx.save();
  ctx.fillStyle = themeConfig.textColor;
  ctx.font = '900 52px "Outfit", system-ui, sans-serif';

  // Truncate name if too long
  let displayName = builderName;
  if (ctx.measureText(displayName).width > photoW) {
    while (ctx.measureText(displayName + '...').width > photoW && displayName.length > 0) {
      displayName = displayName.slice(0, -1);
    }
    displayName += '...';
  }
  ctx.fillText(displayName, photoX, nameY);
  ctx.restore();

  // Builder Title (Highlighted Box)
  const titleY = nameY + 25;
  const builderTitle = builderData.title.trim() ? builderData.title : 'Full-Stack Alchemist';

  ctx.save();
  ctx.font = '700 24px "Plus Jakarta Sans", system-ui, sans-serif';
  const titleMetrics = ctx.measureText(builderTitle);
  const titleBoxW = Math.min(titleMetrics.width + 40, photoW);
  const titleBoxH = 50;

  drawRoundedRect(ctx, photoX, titleY, titleBoxW, titleBoxH, 12);
  ctx.fillStyle = themeConfig.secondaryColor;
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.fillText(builderTitle, photoX + 20, titleY + titleBoxH / 2);
  ctx.restore();

  // ── Editorial filler: 247 watermark in the empty zone ───────────────────
  // Zone: title chip bottom (~958) → footer divider (~1197)
  const titleChipBottom = titleY + titleBoxH; // ≈ 958
  const dividerLineY = (cardY + cardH - 85) - 20; // ≈ 1197 (inline — footerY not yet declared)
  const fillerCenterY = (titleChipBottom + dividerLineY) / 2; // ≈ 1077

  // Thin decorative rule below title chip
  ctx.save();
  ctx.strokeStyle = themeConfig.primaryColor;
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(photoX, titleChipBottom + 28);
  ctx.lineTo(photoX + photoW, titleChipBottom + 28);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Large faint "247" watermark
  ctx.save();
  ctx.font = '900 200px "Outfit", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = themeConfig.textColor;
  ctx.globalAlpha = 0.055;
  ctx.fillText('247', photoX + photoW / 2, fillerCenterY - 8);
  ctx.globalAlpha = 1;
  ctx.restore();

  // "THE ROAD TO 247" tagline
  ctx.save();
  ctx.font = '700 19px "Fira Code", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = themeConfig.mutedTextColor;
  ctx.globalAlpha = 0.55;
  ctx.fillText('THE  ROAD  TO  247', photoX + photoW / 2, dividerLineY - 32);
  ctx.globalAlpha = 1;
  ctx.restore();

  // 6. Bottom Metadata Footer Bar
  const footerY = cardY + cardH - 85;

  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(photoX, footerY - 20);
  ctx.lineTo(photoX + photoW, footerY - 20);
  ctx.stroke();

  ctx.font = '600 16px "Fira Code", monospace';

  // Col 1: Event
  ctx.fillStyle = themeConfig.mutedTextColor;
  ctx.fillText('EVENT', photoX, footerY);
  ctx.fillStyle = themeConfig.textColor;
  ctx.font = '700 18px "Fira Code", monospace';
  ctx.fillText('HH Goa 2026', photoX, footerY + 24);

  // Col 2: Date
  const col2X = photoX + 240;
  ctx.fillStyle = themeConfig.mutedTextColor;
  ctx.font = '600 16px "Fira Code", monospace';
  ctx.fillText('DATES', col2X, footerY);
  ctx.fillStyle = themeConfig.textColor;
  ctx.font = '700 18px "Fira Code", monospace';
  ctx.fillText('28–31 Oct', col2X, footerY + 24);

  // Col 3: Hashtag
  const col3X = col2X + 220;
  ctx.fillStyle = themeConfig.mutedTextColor;
  ctx.font = '600 16px "Fira Code", monospace';
  ctx.fillText('HASHTAG', col3X, footerY);
  ctx.fillStyle = themeConfig.secondaryColor;
  ctx.font = '700 18px "Fira Code", monospace';
  ctx.fillText('#FrameInGoa', col3X, footerY + 24);

  ctx.restore();
}
