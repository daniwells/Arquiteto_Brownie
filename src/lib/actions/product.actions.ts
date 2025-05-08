'use server';

// Libs
import { prisma } from '../../db/prisma';
import { writeFile } from 'fs/promises';

// Utils
import { convertToPlainObject, omitFields, formatError } from '../utils';
import { saveImage, removeImages } from '../server-utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { productType } from '@/types';
import { insertProductSchema, editProductSchema } from '../validators';

// Auth
import { auth } from '../../../auth';

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
    },
  });

  const newData = data.map(({ category, ...rest }) => ({
    ...rest,
    category: category.category,
  }));

  return convertToPlainObject(newData);
}

const getProduct = async (key: string, value: string) => {
  const product = await prisma.product.findFirst({
    where: { [key]: value },
    include: {
      category: true,
    },
  });

  if(!product) return {
    success: false,
    message: `Produto não encontrado, ${key} incorreto`,
  }

  const {category, ...rest} = product;

  const newProduct = {
    ...rest,
    category: category.category,
  }
  
  return {
    success: true,
    content: newProduct
  }
}

export async function getProdutBySlug(slug: string) {
  return getProduct("slug", slug);
}

export async function getProdutById(id: string) {
  return getProduct("id", id);
}

export async function insertProduct(product: productType) {
  try {
    if (!product) return { success: false, message: 'Produto não encontrado' };

    const session = await auth();
    if (!session) throw new Error('Usuário não autenticado');

    // Create product object
    const productObj = insertProductSchema.parse({
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      images: product.images,
      price: product.price,
      active: product.active,
    });
    
    // Adding path of images instead the File
    const imagesString: string[] = [];

    let pathImg = "";
    let buffer: Buffer<ArrayBuffer> | string = "";

    try {
      await Promise.all(
        product?.images?.map(async (img) => {
          const contentImage = await saveImage(img, productObj.slug);
          pathImg = contentImage.pathImg
          buffer = contentImage.buffer

          imagesString.push('/images/sample-products/' + contentImage.nameImg);
        }),
      );
    } catch {
      throw new Error('Não foi possível salvar as imagens do produto');
    }

    const insertedCategory = await prisma.category.findFirst({ where: {category: productObj.category}});
    
    if(!insertedCategory) return {
      success: false,
      message: `Categoria não encontrada`,
    }

    const productObjFinal = {
      ...productObj,
      categoryId: insertedCategory.id,
      images: imagesString,
    };

    // Save product in database
    const insertedProduct = await prisma.product.create({ data: omitFields(productObjFinal, ['category']) });

    if (!insertedProduct) throw new Error('Erro ao criar o produto');
    
    await writeFile(pathImg, buffer);

    return {
      success: true,
      message: 'Produto criado com successo',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function editProduct(id: string, product: productType) {
  try {
    if (!product) return { success: false, message: 'Produto não encontrado' };

    const session = await auth();
    if (!session) throw new Error('Usuário não autenticado');

    const selectedProduct = await prisma.product.findFirst({
      where: { id: id },
    });

    const oldImages = selectedProduct?.images;

    if(!selectedProduct) return {
      success: false,
      message: 'Produto não encontrado, id incorreto',
    }
    
    const imagesIsString = typeof product?.images[0] === "string"

    const datas = {
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      images: product.images,
      price: product.price,
      active: product.active,
    }

    // Create product object
    const productObj = imagesIsString ? editProductSchema.parse(datas) : insertProductSchema.parse(datas);
    
    const imagesString: string[] = [];
    
    let pathImg = "";
    let buffer: Buffer<ArrayBuffer> | string = "";

    if(!imagesIsString){
      // Adding path of images instead the File
      try { 
        await Promise.all(
          product?.images?.map(async (img) => {
            const contentImage = await saveImage(img, productObj.slug);
            pathImg = contentImage.pathImg
            buffer = contentImage.buffer
  
            imagesString.push('/images/sample-products/' + contentImage.nameImg);
          }),
        );
      } catch {
        throw new Error('Não foi possível salvar as imagens do produto');
      }
    }
    
    const productObjWithoutImages = omitFields(productObj, ['images', 'category']);
    
    const insertedCategory = await prisma.category.findFirst({ where: {category: productObj.category}});
    
    if(!insertedCategory) return {
      success: false,
      message: `Categoria não encontrada`,
    }
    
    const productObjFinal = {
      ...productObjWithoutImages,
      ...(!imagesIsString && { images: imagesString }),
      categoryId: insertedCategory.id
    };

    // Update in database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {...productObjFinal},
    });

    if (!updatedProduct) throw new Error('Erro ao editar o produto');

    if(!imagesIsString) {
      const responseRemoveImage = await removeImages(oldImages || []);

      if(!responseRemoveImage.success){
        return responseRemoveImage;
      }

      try{
        await writeFile(pathImg, buffer);
      }catch{
        return {
          success: false,
          message: 'Não foi possível salvar as imagens dos produtos',
        };    
      }
    }

    return {
      success: true,
      message: 'Produto editado com successo',
    };
  }catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}