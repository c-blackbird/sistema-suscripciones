// src/Models/Invoice.ts
import { InvoiceItem } from './InvoiceItem';

export enum InvoiceStatus {
    PAID = 'paid',
    UNPAID = 'unpaid',
    CANCELLED = 'cancelled',
    PENDING = 'pending'
}

export class Invoice {
    constructor(
        public id: string,
        public subscriptionId: string,
        public userId: string,
        public amount: number,
        public status: InvoiceStatus,
        public dueDate: Date,
        public paidAt: Date | null = null,
        public items: InvoiceItem[] = [],
        public createdAt: Date = new Date()
    ) {}

    public markAsPaid(): void {
        this.status = InvoiceStatus.PAID;
        this.paidAt = new Date();
    }

    public cancel(): void {
        this.status = InvoiceStatus.CANCELLED;
    }

    public addItem(item: InvoiceItem): void {
        this.items.push(item);
        this.amount += item.getTotal();
    }

    public toJSON(): any {
        return {
            id: this.id,
            subscriptionId: this.subscriptionId,
            userId: this.userId,
            amount: this.amount,
            status: this.status,
            dueDate: this.dueDate,
            paidAt: this.paidAt,
            items: this.items.map(item => item.toJSON()),
            createdAt: this.createdAt
        };
    }
}