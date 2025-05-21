import { OrderStatus } from '@prisma/client';

import { z } from 'zod';
import {
  insertProductSchema,
  insertCustomerSchema,
  insertOrderSchema,
  insertOrderItemSchema,
  editProductSchema
} from '../lib/validators';

export type productType = z.infer<typeof insertProductSchema> & {
  id?: string;
  createdAt?: Date;
};

export type editProductType = z.infer<typeof editProductSchema> & {
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

export type orderItemType = z.infer<typeof insertOrderItemSchema> & {
  id?: string;
};

export type orderType = z.infer<typeof insertOrderSchema> & {
  id?: string;
  status: OrderStatus;
  OrderItem?: orderItemType[];
  customer?: customerType;
};
