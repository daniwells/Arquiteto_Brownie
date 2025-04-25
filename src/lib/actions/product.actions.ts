'use server';

import { prisma } from "../../db/prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";
import { formatError } from "../utils";
import { productType } from "@/types";
import { auth } from "../../../auth";
import { insertProductSchema } from "../validators";

export async function getLatestProducts(){
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: "desc" }
    })

    return convertToPlainObject(data);
}

export async function getProdutBySlug(slug: string){
    return await prisma.product.findFirst({
        where: {slug: slug}
    });
}

export async function insertProduct(product: productType){
    try{
        if(!product) return {success: false, message: "Produto não encontrado"};
        
        const session = await auth();
        if(!session) throw new Error('Usuário não autenticado');

        // Create product object
        const productObj = insertProductSchema.parse({
            name: product.name,
            slug: product.slug,
            category: product.category,
            description: product.description,
            images: product.images, 
            price: product.price,
            active: product.active,
        });

        const insertedProduct = await prisma.product.create({ data: productObj });

        if(!insertedProduct) throw new Error('Erro ao criar o produto');
        
        return { 
            success: true, 
            message: 'Produto criado com sucesso', 
        };
    }catch (error){
        return{
            success: false,
            message: formatError(error)
        };
    }
}