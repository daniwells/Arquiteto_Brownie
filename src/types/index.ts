import {z} from "zod";
import { 
    insertProductSchema, 
} from "../lib/validators";

export type productType = z.infer<typeof insertProductSchema> & {
    id: string;
    createdAt: Date;
}

export type cartItemType = productType & {qty: number}

export type cartType = {
    items: cartItemType[];
    itemsPrice: string;
}
