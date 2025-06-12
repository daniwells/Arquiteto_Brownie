import { auth } from "../../auth";

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
    }
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

beforeEach(() => {
  const fakeSession = { user: { name: 'Daniel' } };

  jest.clearAllMocks();
  (auth as jest.Mock).mockResolvedValue(fakeSession);
});