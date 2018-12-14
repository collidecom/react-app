export function convertCreditsToDollars(credits: number): string {

    const result = (credits/100).toFixed(2);
    return result;

}