import dotenv from 'dotenv';

dotenv.config();

jest.mock('next-auth', () => {
  const NextAuth = jest.fn(() => {
    return {
      handlers: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      auth: jest.fn(),
    };
  });

  return {
    __esModule: true,
    default: NextAuth,
    getSession: jest.fn(() => null),
  };
});

jest.mock('next-auth/providers/google', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      id: 'google',
      name: 'Google',
      type: 'oauth',
    })),
  };
});
