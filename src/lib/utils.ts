export function convertToPlainObject<T>(value: T): T{
    return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
    const [int, decimal] = num.toString().split(".");
    return decimal ? `${int}${decimal.padEnd(2, "0")}` : `${int}.00`;
}