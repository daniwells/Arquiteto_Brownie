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

    const lastCategory = await prisma.category.findFirst({
      orderBy: { position: "desc" },
    });

    const nextPosition = (lastCategory?.position ?? 0) + 1;

    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');
    
    const insertedCategory = await prisma.category.create({ data: { category: category,  position: nextPosition, } });
    
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

export async function patchCategory(idA: string, idB: string) {
  try {
    const categories = await prisma.category.findMany({
      where: { id: { in: [idA, idB] } },
      select: { id: true, position: true },
    });

    if (categories.length !== 2) throw new Error("Uma ou ambas categorias não existem");

    const posA = categories.find(c => c.id === idA)!.position;
    const posB = categories.find(c => c.id === idB)!.position;

    await prisma.$transaction([
      prisma.category.update({
        where: { id: idA },
        data: { position: -1 },
      }),
      prisma.category.update({
        where: { id: idB },
        data: { position: posA },
      }),
      prisma.category.update({
        where: { id: idA },
        data: { position: posB },
      }),
    ]);

    return {
      success: true,
      message: "Posições invertidas com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error, 'category'),
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