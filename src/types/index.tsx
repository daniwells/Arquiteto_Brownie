import {z} from "zod";
import { 
    insertProductSchema, 
} from "@/lib/validators";

export type productType = z.infer<typeof insertProductSchema> & {
    id: string;
    createdAt: Date;
}