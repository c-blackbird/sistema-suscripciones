export declare class InvoiceItem {
    description: string;
    amount: number;
    quantity: number;
    constructor(description: string, amount: number, quantity?: number);
    getTotal(): number;
    toJSON(): any;
}
