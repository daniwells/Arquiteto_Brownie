import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

export const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Preço deve ter pelo menos duas casas decimais',
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, 'Nome do produto deve ter pelo menos 3 caracteres'),
  slug: z.string().min(3, 'Nome ou categoria inválidos'),
  category: z.string().min(3, 'Selecione uma categoria válida'),
  description: z.string().min(3, 'Descrição do produto deve ter pelo menos 3 caracteres'),
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: 'O arquivo deve ter no máximo 5MB',
        })
        .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
          message: 'Apenas arquivos JPG ou PNG são permitidos',
        }),
    )
    .min(1, 'Produto deve ter pelo menos uma imagem'),
  price: currency,
  active: z.boolean(),
});

export const editProductSchema = insertProductSchema.extend({
  images: z.array(z.string()),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Id do produto é necessário'),
  name: z.string().min(1, 'Nome do produto é necessário'),
  slug: z.string().min(1, 'Produto é necessário'),
  qty: z.number().int().nonnegative('Quantidade deve ser um número positivo'),
  image: z.string().min(1, 'Imagens do produto são necessárias'),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
});

export const signInFormSchema = z.object({
  email: z.string().email('Endereço de email inválido'),
  password: z.string().min(6, 'Sua senha deve ter pelo menos 6 caracteres'),
});

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  qty: z.number().int().nonnegative('Quantidade deve ser um número positivo'),
  unitPrice: currency,
  slug: z.string().min(1, 'Pedido é necessário'),
});

export const insertOrderSchema = z.object({
  customerId: z.string(),
  itemsPrice: currency,
  shippingPrice: z.number(),
  totalPrice: currency,
  createdAt: z.date(),
});

export const insertCustomerSchema = z.object({
  name: z
    .string({
      required_error: 'Nome do cliente é obrigatório',
      invalid_type_error: 'Nome do cliente deve ser um valor válido',
    })
    .min(3, 'Nome do cliente deve ter pelo menos 3 caracteres'),
  cep: z
    .string({
      required_error: 'CEP é obrigatório',
      invalid_type_error: 'CEP deve ser um valor válido',
    })
    .regex(/^\d+$/, { message: 'CEP deve conter apenas valores numéricos' })
    .min(8, 'Cep deve ter pelo menos 8 caracteres')
    .max(8, 'Cep deve ter no máximo 8 caracteres'),
  phone: z
    .string({
      required_error: 'Telefone é obrigatório',
      invalid_type_error: 'Telefone deve ser um valor válido',
    })
    .regex(/^\d+$/, { message: 'Telefone deve conter apenas valores numéricos' })
    .min(11, 'Telefone deve ter pelo menos 11 caracteres')
    .max(11, 'Telefone deve ter no máximo 13 caracteres'),
  number: z
    .string({
      required_error: 'Número da residência é obrigatório',
      invalid_type_error: 'Número da residência deve ser um valor válido',
    })
    .regex(/^\d+$/, { message: 'Número da residência deve conter apenas valores numéricos' })
    .min(2, 'Número da residência deve ter pelo menos 2 caracteres'),
});
