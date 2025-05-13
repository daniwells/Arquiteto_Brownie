import { z } from 'zod';
import { insertProductSchema, insertCustomerSchema } from '../lib/validators';

export type productType = z.infer<typeof insertProductSchema> & {
  id?: string;
  createdAt?: Date;
};

export type productTypeImageString = Omit<productType, 'images'> & {
  images: string[];
};

export type cartItemType = productTypeImageString & { qty: number };

export type cartType = {
  items: cartItemType[];
  itemsPrice: string;
};

export type customerType = z.infer<typeof insertCustomerSchema> & {
  id?: string;
};
