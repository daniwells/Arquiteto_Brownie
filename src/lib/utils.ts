import { ZodSchema } from "zod";

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error('Value is not a number or string');
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

// Format currency using the formatter above
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return 'NaN';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any, action?: string) {
  if (error.name === 'ZodError') {
    const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].message);
    return fieldErrors.join('. ');
  }

  if (error.name === 'PrismaClientKnownRequestError') {
    if (error.code === 'P2002') {
      const field = error.meta?.target ? error.meta.target[0] : 'Campo';
      return `${field.charAt(0).toUpperCase() + field.slice(1)} já existe`;
    }

    if (error.code === 'P2003' && action === 'category') {
      return 'Não é possível excluir esta categoria pois existem produtos associados a ela';
    }

    if (error.code === 'P2003' && action === 'order') {
      return 'Não foi possível criar o seu pedido! Produtos não encontrados';
    }
  }

  // Default fallback
  return typeof error.message === 'string' ? error.message : 'Ocorreu um erro inesperado.';
}

export const normalizeString = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const formatMessagesZod = (zodError: any) => {
  let finalErrorMessage = 'Erro: ';

  zodError.map((item: any, index: number) => {
    if (zodError.length - 1 === index) {
      finalErrorMessage += item.message + '.';
    } else {
      finalErrorMessage += item.message + '; ';
    }
  });

  return finalErrorMessage;
};

export const omitFields = <T extends object, K extends keyof T>(
  obj: T,
  fields: K[],
): Omit<T, K> => {
  const newObj = { ...obj };
  for (const field of fields) {
    delete newObj[field];
  }
  return newObj;
};

export const getNameImageFromPath = (image: string) => {
  return image.split('/')[image.split('/').length - 1].split(')').slice(1).join('-');
};

export const validateForm = <T>(schema: ZodSchema<T>, data: any) => {
    const result = schema.safeParse(data);

    if (result.success) {
        return {status: true};  
    } else {
        return {status: false, message: result.error.errors};
    }
}