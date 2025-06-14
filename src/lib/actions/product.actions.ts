'use server';

// Libs
import { prisma } from '../../db/prisma';
import cloudinary from '../cloudinary';

// Services
import { removeImages, saveAllImages } from '../services/product-services';

// Utils
import { convertToPlainObject, omitFields, formatError } from '../utils/utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { productType } from '@/types';
import { insertProductSchema, editProductSchema } from '../utils/validators';
import { CustomError } from '../utils/exceptions';

// Auth
import { auth } from '../../../auth';

export async function getLatestProducts() {
  try{
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
  }catch(error){
    return {
      success: false,
      message: await formatError(error),
    };
  }
}

const getProduct = async (key: string, value: string) => {
  try{
    const product = await prisma.product.findFirst({
      where: { [key]: value },
      include: {
        category: true,
      },
    });

    if (!product)
      return {
        success: false,
        message: `Produto não encontrado, ${key} incorreto`,
      };

    const { category, ...rest } = product;

    const newProduct = convertToPlainObject({
      ...rest,
      category: category.category,
    });

    return {
      success: true,
      message: '',
      content: newProduct,
    };
  }catch(error){
    return {
      success: false,
      message: await formatError(error),
    };
  }
};

export async function getProdutBySlug(slug: string) {
  return getProduct('slug', slug);
}

export async function getProdutById(id: string) {
  return getProduct('id', id);
}

export async function insertProduct(product: productType) {
  try {
    if (!product) return { success: false, message: 'Produto não encontrado' };

    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');

    const productObj = insertProductSchema.parse({
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      images: product.images,
      price: product.price,
      active: product.active,
    });

    const imagesString: string[] = [];
    const uploadedPublicIds: string[] = [];

    await saveAllImages(
      product, 
      productObj, 
      imagesString, 
      uploadedPublicIds
    );

    const insertedCategory = await prisma.category.findFirst({
      where: { category: productObj.category },
    });

    if (!insertedCategory)
      return {
        success: false,
        message: `Categoria não encontrada`,
      };

    const productObjFinal = {
      ...productObj,
      categoryId: insertedCategory.id,
      images: imagesString,
    };

    const insertedProduct = await prisma.product.create({
      data: omitFields(productObjFinal, ['category']),
    });

    if (!insertedProduct) {
      await Promise.all(
        uploadedPublicIds.map(async (id) => {
          try {
            await cloudinary.uploader.destroy(id);
          } catch {
            return {
              success: false,
              message: 'Produto não pode ser criado! Erro de conexão pelo lado do servidor',
            };
          }
        }),
      );
      throw new CustomError('Erro ao criar o produto');
    }

    return {
      success: true,
      message: 'Produto criado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error),
    };
  }
}



export async function editProduct(id: string, product: productType) {
  try {
    if (!id) return { success: false, message: 'Produto não encontrado' };
    if (!product) return { success: false, message: 'Novo produto não recebido' };

    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');

    const selectedProduct = await prisma.product.findFirst({
      where: { id: id },
    });

    const oldImages = selectedProduct?.images;

    if (!selectedProduct)
      return {
        success: false,
        message: 'Produto não encontrado, id incorreto',
      };

    const imagesIsString = typeof product?.images[0] === 'string';

    const datas = {
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      images: product.images,
      price: product.price,
      active: product.active,
    };

    const productObj = imagesIsString
      ? editProductSchema.parse(datas)
      : insertProductSchema.parse(datas);

    const imagesString: string[] = [];
    const uploadedPublicIds: string[] = [];

    if (!imagesIsString) {
      await saveAllImages(
        product, 
        productObj, 
        imagesString, 
        uploadedPublicIds
      );
    }

    const productObjWithoutImages = omitFields(productObj, ['images', 'category']);

    const insertedCategory = await prisma.category.findFirst({
      where: { category: productObj.category },
    });

    if (!insertedCategory)
      return {
        success: false,
        message: "Categoria não encontrada",
      };

    const productObjFinal = {
      ...productObjWithoutImages,
      ...(!imagesIsString && { images: imagesString }),
      categoryId: insertedCategory.id,
    };

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { ...productObjFinal },
    });

    if (!updatedProduct) {
      await Promise.all(
        uploadedPublicIds.map(async (id) => {
          try {
            await cloudinary.uploader.destroy(id);
          } catch {
            return {
              success: false,
              message: 'Produto não pode ser criado! Erro de conexão pelo lado do servidor',
            };
          }
        }),
      );
      throw new CustomError('Erro ao editar o produto');
    }

    if (!imagesIsString) {
      const responseRemoveImage = await removeImages(oldImages || []);

      if (!responseRemoveImage?.success) {
        return responseRemoveImage;
      }
    }

    return {
      success: true,
      message: 'Produto editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error),
    };
  }
}

export async function removeProduct(id: string) {
  try {
    if (!id) return { success: false, message: 'Produto não encontrado' };

    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');

    const selectedProduct = await prisma.product.delete({
      where: { id: id },
    });

    const oldImages = selectedProduct?.images;

    if (!selectedProduct)
      return {
        success: false,
        message: 'Produto não encontrado',
      };

    const responseRemoveImage = await removeImages(oldImages || []);

    if (!responseRemoveImage.success) {
      return responseRemoveImage;
    }

    return {
      success: true,
      message: 'Produto editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error, "product"),
    };
  }
}