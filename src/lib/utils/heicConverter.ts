/**
 * Converts HEIC/HEIF images (commonly from iPhones) to standard JPEG Blob
 * using dynamic client-side import of heic2any.
 */
export async function convertHeicToJpegIfNeeded(file: File): Promise<Blob | File> {
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  const isHeic = 
    fileName.endsWith('.heic') || 
    fileName.endsWith('.heif') || 
    fileType === 'image/heic' || 
    fileType === 'image/heif';

  if (!isHeic) {
    return file;
  }

  try {
    // Dynamic import to keep initial bundle size minimal
    const heic2anyModule = await import('heic2any');
    const heic2any = heic2anyModule.default;

    const result = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.92,
    });

    if (Array.isArray(result)) {
      return result[0];
    }

    return result;
  } catch (error) {
    console.error('HEIC conversion failed:', error);
    // Fallback: return original file in case browser can render it natively
    return file;
  }
}
