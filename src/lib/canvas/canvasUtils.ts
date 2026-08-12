import { TransformState } from '@/types';

/**
 * Draws an image with object-fit: cover behavior inside a target bounding box,
 * applying optional zoom scale and user offset X/Y for fine reframing.
 */
export function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number,
  transform: TransformState = { scale: 1, offsetX: 0, offsetY: 0 }
) {
  const imgWidth = img.naturalWidth || img.width;
  const imgHeight = img.naturalHeight || img.height;

  if (!imgWidth || !imgHeight) return;

  // Base cover scale factor
  const baseScale = Math.max(dWidth / imgWidth, dHeight / imgHeight);
  const finalScale = baseScale * transform.scale;

  const renderWidth = imgWidth * finalScale;
  const renderHeight = imgHeight * finalScale;

  // Default centered position + user manual offsets
  const x = dx + (dWidth - renderWidth) / 2 + transform.offsetX;
  const y = dy + (dHeight - renderHeight) / 2 + transform.offsetY;

  ctx.save();
  // Clip to destination container boundary
  ctx.beginPath();
  ctx.rect(dx, dy, dWidth, dHeight);
  ctx.clip();

  ctx.drawImage(img, x, y, renderWidth, renderHeight);
  ctx.restore();
}

/**
 * Draws a rounded rectangle path with customizable corner radii.
 */
export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | { tl: number; tr: number; br: number; bl: number }
) {
  const r = typeof radius === 'number' 
    ? { tl: radius, tr: radius, br: radius, bl: radius }
    : radius;

  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + width - r.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r.tr);
  ctx.lineTo(x + width, y + height - r.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r.br, y + height);
  ctx.lineTo(x + r.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.quadraticCurveTo(x, y, x + r.tl, y);
  ctx.closePath();
}

/**
 * Helper to wrap text into multiple lines if it exceeds maxWidth.
 */
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

/**
 * Draws a pill badge with custom background and text.
 */
export function drawBadge(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  bgColor: string,
  textColor: string,
  borderColor?: string
) {
  ctx.font = '600 16px "Plus Jakarta Sans", system-ui, sans-serif';
  const paddingX = 16;
  const paddingY = 8;
  const textMetrics = ctx.measureText(text);
  const badgeWidth = textMetrics.width + paddingX * 2;
  const badgeHeight = 32;

  ctx.save();
  drawRoundedRect(ctx, x, y, badgeWidth, badgeHeight, 16);
  ctx.fillStyle = bgColor;
  ctx.fill();

  if (borderColor) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + badgeWidth / 2, y + badgeHeight / 2);
  ctx.restore();

  return badgeWidth;
}
