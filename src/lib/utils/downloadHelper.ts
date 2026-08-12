/**
 * Triggers direct browser download of a Canvas graphic as a high-resolution PNG.
 */
export function downloadCanvasAsImage(canvas: HTMLCanvasElement, filename = 'HH_Goa_2026_Builder_Pass.png'): void {
  try {
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback using toBlob
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png', 1.0);
  }
}
