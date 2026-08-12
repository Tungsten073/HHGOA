import { FrameTheme, TransformState } from '@/types';
import { THEME_CONFIGS, PFP_CANVAS_SIZE, EVENT_DETAILS } from '@/constants/templates';
import { drawCoverImage, drawRoundedRect } from './canvasUtils';

export function drawPfpFrame(
  canvas: HTMLCanvasElement,
  userImage: HTMLImageElement | null,
  theme: FrameTheme = 'editorial',
  transform: TransformState = { scale: 1, offsetX: 0, offsetY: 0 },
  builderName = ''
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const size = PFP_CANVAS_SIZE;
  canvas.width = size;
  canvas.height = size;

  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.editorial;

  // 1. Rich Canvas Backdrop
  ctx.fillStyle = themeConfig.bgColor;
  ctx.fillRect(0, 0, size, size);

  // Subtle background geometric accents
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  const gridStep = 60;
  for (let x = 0; x < size; x += gridStep) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  for (let y = 0; y < size; y += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Main Visual Focus: Avatar Circle
  const avatarCenterX = size / 2;
  const avatarCenterY = size / 2 - 10;
  const avatarRadius = 410;

  if (userImage) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
    ctx.clip();

    const dWidth = avatarRadius * 2;
    const dHeight = avatarRadius * 2;
    const dx = avatarCenterX - avatarRadius;
    const dy = avatarCenterY - avatarRadius;

    drawCoverImage(ctx, userImage, dx, dy, dWidth, dHeight, transform);
    ctx.restore();
  } else {
    // Empty state placeholder avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#142921';
    ctx.fill();

    ctx.fillStyle = '#8FA89B';
    ctx.font = '700 42px "Outfit", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('UPLOAD PHOTO', avatarCenterX, avatarCenterY);
    ctx.restore();
  }

  // 3. Bold Outer Frame Border
  ctx.save();
  ctx.lineWidth = 16;
  const ringGrad = ctx.createLinearGradient(
    avatarCenterX - avatarRadius,
    avatarCenterY - avatarRadius,
    avatarCenterX + avatarRadius,
    avatarCenterY + avatarRadius
  );
  ringGrad.addColorStop(0, themeConfig.secondaryColor);
  ringGrad.addColorStop(0.5, themeConfig.accentColor);
  ringGrad.addColorStop(1, themeConfig.borderColor);

  ctx.strokeStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner clean white/cream stroke
  ctx.save();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(245, 242, 235, 0.5)';
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius - 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 4. Header Event Badge — "HACKER HOUSE GOA 2026 • 28–31 OCT"
  ctx.save();
  const topBannerY = 45;
  const topBannerW = 720;
  const topBannerH = 68;
  const topBannerX = (size - topBannerW) / 2;

  // Solid Editorial Card Badge
  drawRoundedRect(ctx, topBannerX, topBannerY, topBannerW, topBannerH, 34);
  ctx.fillStyle = '#07120E';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = themeConfig.secondaryColor;
  ctx.stroke();

  // Text
  ctx.fillStyle = '#F5F2EB';
  ctx.font = '800 24px "Outfit", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('[  HH GOA 2026  ·  247  ]', size / 2, topBannerY + topBannerH / 2);
  ctx.restore();

  // 5. Bottom Banner — Builder Name & Event Info (NO "SHORTLISTED")
  ctx.save();
  const bottomBannerY = size - 145;
  const bottomBannerW = 820;
  const bottomBannerH = 88;
  const bottomBannerX = (size - bottomBannerW) / 2;

  drawRoundedRect(ctx, bottomBannerX, bottomBannerY, bottomBannerW, bottomBannerH, 44);
  ctx.fillStyle = '#07120E';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = themeConfig.accentColor;
  ctx.stroke();

  // Builder Name
  const nameText = builderName.trim() ? builderName.toUpperCase() : 'BUILDING IN GOA';
  ctx.fillStyle = themeConfig.accentColor;
  ctx.font = '900 28px "Outfit", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(nameText, size / 2, bottomBannerY + 32);

  // Neutral Subtext
  ctx.fillStyle = '#F5F2EB';
  ctx.font = '600 18px "Fira Code", monospace';
  ctx.fillText('BUILDER  •  28–31 OCT 2026  •  #FrameInGoa', size / 2, bottomBannerY + 62);
  ctx.restore();

  // Small "THE ROAD TO 247" tagline below the bottom banner
  ctx.save();
  ctx.fillStyle = themeConfig.accentColor;
  ctx.font = '700 17px "Fira Code", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.65;
  ctx.fillText('THE  ROAD  TO  247', size / 2, bottomBannerY + bottomBannerH + 30);
  ctx.globalAlpha = 1;
  ctx.restore();

  // 6. Editorial Corner Stamps & Batch Code "247"
  ctx.save();
  ctx.fillStyle = themeConfig.secondaryColor;
  ctx.font = '900 20px "Fira Code", monospace';

  // Top Left "247"
  ctx.fillText('[247]', 40, 50);

  // Top Right Date
  ctx.textAlign = 'right';
  ctx.fillStyle = '#F5F2EB';
  ctx.font = '700 16px "Fira Code", monospace';
  ctx.fillText('GOA 2026', size - 40, 50);

  ctx.restore();
}
