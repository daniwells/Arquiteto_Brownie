import { join } from 'path';
import { unlink, mkdir } from 'fs/promises';

// Remove image for each path in the list
export const removeImages = async (filesToDelete: string[]) => {
  try {    
    for (const relativePath of filesToDelete) {
      const filePath = join(process.cwd(), 'public', relativePath);
      await unlink(filePath);
    }
    
    return {
      success: true,
      message: 'Imagens removidas com successo',
    }
  } catch{
    return {
      success: false,
      message: 'Erro ao remover os arquivos de imagens',
    }
    
  }
};

export const saveImage = async (img: File, slug: string) => {
    const arrayBuffer = await img.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const nameImg = `(${slug}-${Date.now()})${img.name}`;
    
    const dir = join(process.cwd(), 'public/images/sample-products');
    await mkdir(dir, { recursive: true });
  
    const pathImg = join(dir, nameImg);
    
    return {pathImg, buffer, nameImg}
}