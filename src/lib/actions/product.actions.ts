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
  });

  return convertToPlainObject(data);
}

const getProduct = async (key: string, value: string) => {
  const product = await prisma.product.findFirst({
    where: { [key]: value },
  });

  if(!product) return {
    success: false,
    message: `Produto não encontrado, ${key} incorreto`,
  }
  
  return {
    success: true,
    content: product
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

    const productObjFinal = { ...productObj, images: imagesString,};

    // Save product in database
    const insertedProduct = await prisma.product.create({ data: productObjFinal });

    if (!insertedProduct) throw new Error('Erro ao criar o produto');
    
    await writeFile(pathImg, buffer);

    return {
      success: true,
      message: 'Produto criado com sucesso',
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

    const productObjWithoutImages = omitFields(productObj, ['images']);

    const productObjFinal = {
      ...productObjWithoutImages,
      ...(!imagesIsString && { images: imagesString }),
    };

    // Update in database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: productObjFinal,
    });

    if (!updatedProduct) throw new Error('Erro ao editar o produto');

    if(!imagesIsString) {
      await removeImages(productObjFinal.slug);
      await writeFile(pathImg, buffer);
    }

    return {
      success: true,
      message: 'Produto editado com sucesso',
    };
  }catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}