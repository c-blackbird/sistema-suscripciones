import { IInvoiceRepository } from './Interfaces/IInvoiceRepository';
import { Invoice } from '../Models/Invoice';
export declare class InvoiceRepository implements IInvoiceRepository {
    private db;
    private collectionName;
    constructor();
    findById(id: string): Promise<Invoice | null>;
    findByUserId(userId: string): Promise<Invoice[]>;
    findBySubscriptionId(subscriptionId: string): Promise<Invoice[]>;
    create(invoice: Invoice): Promise<Invoice>;
    update(id: string, invoice: Partial<Invoice>): Promise<Invoice | null>;
    delete(id: string): Promise<boolean>;
    findUnpaid(): Promise<Invoice[]>;
    findAll(): Promise<Invoice[]>;
    private mapToInvoice;
}
