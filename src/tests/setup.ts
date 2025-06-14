import { auth } from "../../auth";

class File {
  parts: any[];
  name: string;
  size: number;
  type: string;
  lastModified: number;
  
  constructor(parts: any[], filename: string, properties?: any) {
    this.parts = parts;
    this.name = filename;
    this.lastModified = properties?.lastModified || Date.now();
    this.size = parts.reduce((acc, part) => acc + (part.length || 0), 0);
    this.type = properties?.type || '';
  }
}

(global as any).File = File;

jest.mock('../db/prisma', () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    category: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
    },
    customer: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    order: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock('../../auth');
jest.mock('../lib/cloudinary');
jest.mock('../lib/services/product-services', () => ({
  ...jest.requireActual('../lib/services/product-services'),
  saveImages: jest.fn(),
  saveAllImages: jest.fn(),
  removeImages: jest.fn(),
}));

jest.mock('next/dist/client/components/redirect', () => ({
  getRedirectError: jest.fn(),
}));

jest.mock('../lib/services/order-services', () => ({
  validateCart: jest.fn(),
}));

beforeEach(() => {
  const fakeSession = { user: { name: 'Daniel' } };

  jest.clearAllMocks();
  (auth as jest.Mock).mockResolvedValue(fakeSession);
});

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));