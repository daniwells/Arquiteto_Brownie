import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

export const currency = z
.string()
.refine(
    (value) => /^\d+(\.\d{2})?$/.test((formatNumberWithDecimal(Number(value)))),
    "Preço deve ter pelo menos duas casas decimais"
);

export const insertProductSchema = z.object({
    name: z.string().min(3, "Nome do produto deve ter pelo menos 3 caracteres"),
    slug: z.string().min(3, "Slug deve ter pelo menos 3 caracteres"),
    category: z.string().min(3, "Category deve ter pelo menos 3 caracteres"),
    description: z.string().min(3, "Description deve ter pelo menos 3 caracteres"),
    images: z.array(z.string()).min(1, "Produto deve ter pelo menos uma imagem"), 
    price: currency,
});

export const cartItemSchema = z.object({
    productId: z.string().min(1, "Id do produto é necessário"),
    name: z.string().min(1, "Nome do produto é necessário"),
    slug: z.string().min(1, "Produto é necessário"),
    qty: z.number().int().nonnegative("Quantidade deve ser um número positivo"),
    image: z.string().min(1, "Imagens do produto são necessárias"),
    price: currency
});

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    sessionCartId: z.string().min(1, "Session cart id is required"),
    custumerId: z.string().optional().nullable(),
});

export const signInFormSchema = z.object({
    email: z.string().email("Endereço de email inválido"),
    password: z.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
})

