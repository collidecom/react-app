export default interface Subscription {
    id: number;
    name: string;
    credits_price: number;
    duration: number;
    duration_str: string;
    type: 'MEDIA' | 'PATRON';
    custom: 'YES' | 'NO';
    dollarPrice: string;
}