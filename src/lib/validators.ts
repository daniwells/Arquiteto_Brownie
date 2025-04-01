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
});

