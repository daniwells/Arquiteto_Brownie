import { auth } from '../../auth';
import { getAllCategories, insertCategory } from '@/lib/actions/category.actions';
import { prisma } from '@/db/prisma';

const mockCategories = [
    { id: '1', name: 'Category A' },
    { id: '2', name: 'Category B' },
];

describe('getAllCategories', () => {
  it('Must return all categories successfully', async () => {

    (prisma.category.findMany as jest.Mock).mockResolvedValue(mockCategories);

    const result = await getAllCategories();

    expect(result).toEqual({
      success: true,
      content: mockCategories,
    });
  });

  it("Should return an error message when there is a generic error", async () => {
    (prisma.category.findMany as jest.Mock).mockRejectedValue(new Error('Falha no banco'));

    const result = await getAllCategories();

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
      content: [],
    });
  });
});

describe('insertCategory', () => {
  it('Should fail if category is invalid', async () => {
    const result = await insertCategory('');

    expect(result).toEqual({
      success: false,
      message: 'Categoria não encontrada',
    });
  });

  it("Should fail if user doesn't be authenticated", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const result = await insertCategory('Nova Categoria');

    expect(result).toEqual({
      success: false,
      message: 'Usuário não autenticado',
    });
  });

  it('Should create a category successfully', async () => {
    (prisma.category.create as jest.Mock).mockResolvedValue({ id: '1', category: 'Nova Categoria' });

    const result = await insertCategory('Nova Categoria');

    expect(result).toEqual({
      success: true,
      message: 'Categoria criada com sucesso',
    });
  });

  it('Should fail if the return of database if null', async () => {
    (prisma.category.create as jest.Mock).mockResolvedValue(null);

    const result = await insertCategory('Categoria');

    expect(result).toEqual({
      success: false,
      message: 'Erro ao criar a categoria',
    });
  });

  it('SHould return error when there is a generic exception', async () => {
    (prisma.category.create as jest.Mock).mockRejectedValue(new Error('Falha no banco'));

    const result = await insertCategory('Erro Categoria');

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
    });
  });
});