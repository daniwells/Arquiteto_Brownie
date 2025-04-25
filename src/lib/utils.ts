// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T{
    return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
    const [int, decimal] = num.toString().split(".");
    return decimal ? `${int}${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Round number to 2 decimal places
export function round2(value: number | string){
    if(typeof value === "number"){
      return Math.round((value + Number.EPSILON) * 100) / 100;
    } else if(typeof value === "string"){
      return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    }else{
      throw new Error("Value is not a number or string")
    }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

// Format currency using the formatter above
export function formatCurrency(amount: number | string | null){
    if(typeof amount === "number"){
      return CURRENCY_FORMATTER.format(amount);
    }else if(typeof amount === "string"){
      return CURRENCY_FORMATTER.format(Number(amount));
    }else{
      return "NaN";
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any){
    if(error.name === "ZodError"){
      // Handle Zod error
      const fieldErrors = Object.keys(error.errors).map(
        (field) => error.errors[field].message
      );
  
      return fieldErrors.join(". ");
    }else if(error.name === "PrismaClientKnownRequestError" && error.code === "P2002"){
      // Handle Prisma error
      const field = error.meta?.target ? error.meta.target[0] : "Field";
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }else{
      // Handle other errors
      return typeof error.message === "string" ? 
        error.message : JSON.stringify(error.message);
    }
}

export const normalizeString = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export const formatMessagesZod = (zodError: any) => {
  let finalErrorMessage = "Erro: "
  
  zodError.map((item: any, index: number) => {
      if(zodError.length - 1 === index){
          finalErrorMessage += item.message + ".";
      }else{
          finalErrorMessage += item.message + "; ";
      }
      
  });

  return finalErrorMessage;
}