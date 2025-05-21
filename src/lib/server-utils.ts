import cloudinary from '@/lib/cloudinary';
import { productType, editProductType } from '@/types';
import { Readable } from 'stream';

// Save images from product
export const saveImages = async (
  buffer: Buffer<ArrayBuffer>,
  img: File,
  productObj: productType | editProductType,
) => {
  const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'samples/arquitetodobrownie/products',
          public_id: `${productObj.slug}__SEP__${Date.now()}__SEP__${img.name}`,
        },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Erro desconhecido'));
          resolve(result);
        },
      );

      Readable.from(buffer).pipe(uploadStream);
    },
  );
  return uploadResult;
};

// Remove image for each path in the list
export const removeImages = async (urls: string[]) => {
  try {
    const publicIds = urls
      .map((url) => {
        const parts = url.split('/upload/');
        const path = parts[1]?.split('.')[0];
        return path;
      })
      .filter(Boolean);

    // Remove images of cloudinary
    const results = await Promise.all(publicIds.map((id) => cloudinary.uploader.destroy(id)));

    return { success: true, message: 'Sucesso ao salvar as imagens do produto', results };
  } catch {
    return { success: false, message: 'Erro ao remover imagens do produto' };
  }
};
