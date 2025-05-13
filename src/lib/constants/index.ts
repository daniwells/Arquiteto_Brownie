export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Arquiteto Brownie';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A digital menu and management system';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LINIT) || 100;
export const EMAIL_ADMIN = process.env.EMAIL_ADMIN?.split(';') || [];
