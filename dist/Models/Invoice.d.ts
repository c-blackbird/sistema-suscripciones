import { InvoiceItem } from './InvoiceItem';
export declare enum InvoiceStatus {
    PAID = "paid",
    UNPAID = "unpaid",
    CANCELLED = "cancelled",
    PENDING = "pending"
}
export declare class Invoice {
    id: string;
    subscriptionId: string;
    userId: string;
    amount: number;
    status: InvoiceStatus;
    dueDate: Date;
    paidAt: Date | null;
    items: InvoiceItem[];
    createdAt: Date;
    constructor(id: string, subscriptionId: string, userId: string, amount: number, status: InvoiceStatus, dueDate: Date, paidAt?: Date | null, items?: InvoiceItem[], createdAt?: Date);
    markAsPaid(): void;
    cancel(): void;
    addItem(item: InvoiceItem): void;
    toJSON(): any;
}
