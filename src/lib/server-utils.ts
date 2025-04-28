import { join } from 'path';
import { readdir, unlink, mkdir } from 'fs/promises';

export const removeImages = async (slug: string) => {
    try {
    const dir = join(process.cwd(), 'public/images/sample-products');
      const files = await readdir(dir);
  
      const filesToDelete = files.filter(file => file.startsWith(slug));
  
      // Remove file
      for (const file of filesToDelete) {
        const filePath = join(dir, file);
        await unlink(filePath);
      }
  
    } catch (error) {
      console.log('Erro ao remover arquivos:', error);
    }
};

export const saveImage = async (img: File, slug: string) => {
    const arrayBuffer = await img.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const nameImg = `${slug}-${Date.now()}-${img.name}`;
    
    const dir = join(process.cwd(), 'public/images/sample-products');
    await mkdir(dir, { recursive: true });
  
    const pathImg = join(dir, nameImg);
    
    return {pathImg, buffer, nameImg}
}