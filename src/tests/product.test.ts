import { auth } from '../../auth';
import { prisma } from '@/db/prisma';

// Actions
import { 
  getLatestProducts,
  getProdutById,
  insertProduct,
  editProduct,
  removeProduct,
} from '../lib/actions/product.actions';

// Utils
import { omitFields } from '@/lib/utils/utils';

// Services
import { saveImages, saveAllImages, removeImages } from '../lib/services/product-services';

const fakeFile = new File(['fake content'], 'image.png', { type: 'image/png' });
fakeFile.arrayBuffer = jest.fn().mockResolvedValue(new ArrayBuffer(8));

const mockProduct = {
  name: 'Brownie1',
  slug: 'brownie_meio_amargo',
  category: 'Meio Amargo',
  description: 'Descrição',
  images: [fakeFile],
  price: "10",
  active: true,
};

const expectedImage = [
  {
    "lastModified": expect.any(Number),
    "name": expect.any(String),
    "parts": [
      expect.any(String),
    ],
    "size": expect.any(Number),
    "type": expect.any(String),
  },
]

describe('getLatestProducts', () => {
  it("should return converted product list", async () => {
    const mockProducts = [mockProduct];

    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getLatestProducts();

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });

    const newMockProduct = omitFields(mockProduct, ["category"]);

    expect(result.content).toMatchObject([{...newMockProduct, images: expectedImage}]);
  });

  it("should return empty array when no products exist", async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getLatestProducts();

    expect(result.content).toEqual([]);
  });

  it("should handle products with no category gracefully", async () => {
    const mockProducts = [
      {
        id: '3',
        name: 'Brownie C',
        createdAt: (new Date()).toDateString(),
        category: null,
      },
    ];

    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getLatestProducts();
    expect(result).toMatchObject({"message": {}, "success": false, "content": []});
  });
});

describe('getProduct', () => {
  const id = '123';

  it('should return the product successfully', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(mockProduct);

    const result = await getProdutById(id);

    expect(prisma.product.findFirst).toHaveBeenCalledWith({
      where: { ['id']: id },
      include: { category: true },
    });

    expect(result).toMatchObject({
      success: true,
      message: '',
      content: {
        name: 'Brownie1',
        slug: 'brownie_meio_amargo',
        description: 'Descrição',
        images: expectedImage,
        price: "10",
        active: true,
      },
    });
  });

  it("should return error when no product exist", async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await getProdutById(id);

    expect(result).toEqual({
      success: false,
      message: `Produto não encontrado, id incorreto`,
    });
  });

  it('should return formated error', async () => {
    const error = new Error('Falha de conexão');

    (prisma.product.findFirst as jest.Mock).mockRejectedValue(error);

    const result = await getProdutById(id);

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
    });
  });
});

describe('insertProduct', () => {
  it('should fail if no product is provided', async () => {
    const result = await insertProduct(undefined as any);
    expect(result).toEqual({
      success: false,
      message: 'Produto não encontrado',
    });
  });

  it('should fail if user is not authenticated', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    const result = await insertProduct({} as any);
    expect(result).toEqual({
      success: false,
      message: 'Usuário não autenticado',
    });
  });

  it('should fail if category is not found', async () => {
    (prisma.category.findFirst as jest.Mock).mockResolvedValue(null);
    
    const productImageFake = new File(['conteúdo'], 'image.png', { type: 'image/png' });

    (saveImages as jest.Mock).mockResolvedValue({
      secure_url: 'fakeImage',
      public_id: 'img123',
    });

    const fakeProduct = {
      name: 'Nome',
      slug: 'slug',
      category: 'NotExist',
      description: 'desc',
      images: [productImageFake],
      price: '5',
      active: true,
    };

    const result = await insertProduct(fakeProduct as any);

    expect(result).toEqual({
      success: false,
      message: 'Categoria não encontrada',
    });
  });

  it('should return success when product is inserted', async () => {
    const category = { id: '123', category: 'Clássico' };
    const insertedProduct = { id: '1' };

    (prisma.category.findFirst as jest.Mock).mockResolvedValue(category);

    (saveImages as jest.Mock).mockResolvedValue({
      secure_url: 'fakeImage',
      public_id: 'img123',
    });
    (prisma.product.create as jest.Mock).mockResolvedValue(insertedProduct);

    const result = await insertProduct(mockProduct as any);

    expect(result).toEqual({
      success: true,
      message: 'Produto criado com sucesso',
    });

    expect(prisma.product.create).toHaveBeenCalled();
  });
});

describe('editProduct', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fail if id is not provided', async () => {
    const response = await editProduct('', mockProduct);
    expect(response.success).toBe(false);
    expect(response.message).toBe('Produto não encontrado');
  });

  it('should fail if product is not provided', async () => {
    const response = await editProduct('123', null as any);
    expect(response.success).toBe(false);
    expect(response.message).toBe('Novo produto não recebido');
  });

  it('should fail if session is not found', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    const response = await editProduct('123', mockProduct);
    expect(response.success).toBe(false);
    expect(response.message).toBe('Usuário não autenticado');
  });

  it('should fail if product is not found in DB', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValueOnce(null);

    const response = await editProduct('123', mockProduct);
    expect(response.success).toBe(false);
    expect(response.message).toBe('Produto não encontrado, id incorreto');
  });

  it('should fail if category is not found', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValueOnce({
      id: '123',
      images: [fakeFile],
    });
    (prisma.category.findFirst as jest.Mock).mockResolvedValue(null);

    const response = await editProduct('123', mockProduct);
    expect(response.success).toBe(false);
    expect(response.message).toBe('Categoria não encontrada');
  });

  it('should edit product successfully with image strings', async () => {
    (removeImages as jest.Mock).mockResolvedValue({ success: true });

    (prisma.product.findFirst as jest.Mock).mockResolvedValue({
      id: '123',
      images: [fakeFile],
    });
    (prisma.category.findFirst as jest.Mock).mockResolvedValue({
      id: 'cat123',
    });
    (prisma.product.update as jest.Mock).mockResolvedValue({ id: '123' });

    const response = await editProduct('123', mockProduct);
    expect(response.success).toBe(true);
    expect(response.message).toBe('Produto editado com sucesso');
  });

  it('should call removeImages if new images are uploaded', async () => {
    const newFakeFile = new File(['new fake content'], 'image2.png', { type: 'image/png' });
    newFakeFile.arrayBuffer = jest.fn().mockResolvedValue(new ArrayBuffer(8));

    const productWithNewFiles = {
      ...mockProduct,
      images: [newFakeFile],
    };

    (prisma.product.findFirst as jest.Mock).mockResolvedValue({
      id: '123',
      images: ['img.jpg'],
    });
    (saveAllImages as jest.Mock).mockResolvedValue(undefined);
    (prisma.category.findFirst as jest.Mock).mockResolvedValue({id: '1'});
    (prisma.product.update as jest.Mock).mockResolvedValue({ id: '123' });
    (removeImages as jest.Mock).mockResolvedValue({ success: true });

    const response = await editProduct('123', productWithNewFiles);
    expect(removeImages).toHaveBeenCalledWith(['img.jpg']);
    expect(response.success).toBe(true);
  });
});

describe('removeProduct', () => {
  it('should fail if id not exists', async () => {
    const response = await removeProduct('');
    expect(response).toEqual({
      success: false,
      message: 'Produto não encontrado',
    });
  });

  it('should fail if session is not found', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const response = await removeProduct('123');

    expect(response).toEqual({
      success: false,
      message: 'Usuário não autenticado',
    });
  });

  it('should fail if product is not found', async () => {
    (prisma.product.delete as jest.Mock).mockResolvedValue(null);

    const response = await removeProduct('123');

    expect(response).toEqual({
      success: false,
      message: 'Produto não encontrado',
    });
  });

  it("should fail if removeImages doesn't work", async () => {
    (prisma.product.delete as jest.Mock).mockResolvedValue({
      id: '123',
      images: ['img1', 'img2'],
    });
    (removeImages as jest.Mock).mockResolvedValue({
      success: false,
      message: 'Falha ao remover imagem',
    });

    const response = await removeProduct('123');

    expect(removeImages as jest.Mock).toHaveBeenCalledWith(['img1', 'img2']);
    expect(response).toEqual({
      success: false,
      message: 'Falha ao remover imagem',
    });
  });

  it('should remove product with success', async () => {
    (prisma.product.delete as jest.Mock).mockResolvedValue({
      id: '123',
      images: ['img1', 'img2'],
    });
    (removeImages as jest.Mock).mockResolvedValue({
      success: true,
    });

    const response = await removeProduct('123');

    expect(prisma.product.delete as jest.Mock).toHaveBeenCalledWith({ where: { id: '123' } });
    expect(removeImages as jest.Mock).toHaveBeenCalledWith(['img1', 'img2']);
    expect(response).toEqual({
      success: true,
      message: 'Produto editado com sucesso',
    });
  });
});