'use server';

// Libs
import { prisma } from '../../db/prisma';
import { convertToPlainObject } from '../utils/utils';

// Auth
import { auth } from '../../../auth';

// Utils
import { CustomError } from '../utils/exceptions';
import { formatError } from '../utils/utils';

export async function getAllCategories() {
  try {
    const data = await prisma.category.findMany();
    return {
      success: true,
      content: convertToPlainObject(data),
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error),
      content: [],
    };
  }
}

export async function insertCategory(category: string) {
  try {
    if (!category) return { success: false, message: 'Categoria não encontrada' };

    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');

    // Save category in database
    const insertedCategory = await prisma.category.create({ data: { category: category } });

    if (!insertedCategory) throw new CustomError('Erro ao criar a categoria');

    return {
      success: true,
      message: 'Categoria criada com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error),
    };
  }
}

export async function removeCategory(categoryId: string) {
  try {
    if (!categoryId) return { success: false, message: 'Id da categoria não encontrado' };

    const session = await auth();
    if (!session) throw new Error('Usuário não autenticado');

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return {
      success: true,
      message: 'Categoria criada com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error, 'category'),
    };
  }
}