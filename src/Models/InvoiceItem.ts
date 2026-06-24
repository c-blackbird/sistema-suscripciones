// src/Models/InvoiceItem.ts
export class InvoiceItem {
    constructor(
        public description: string,
        public amount: number,
        public quantity: number = 1
    ) {}

    public getTotal(): number {
        return this.amount * this.quantity;
    }

    public toJSON(): any {
        return {
            description: this.description,
            amount: this.amount,
            quantity: this.quantity,
            total: this.getTotal()
        };
    }
}