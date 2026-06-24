// src/Repositories/InvoiceRepository.ts
import { DatabaseConnection } from '../Config/DatabaseConnection';
import { IInvoiceRepository } from './Interfaces/IInvoiceRepository';
import { Invoice, InvoiceStatus } from '../Models/Invoice';
import { InvoiceItem } from '../Models/InvoiceItem';

export class InvoiceRepository implements IInvoiceRepository {
    private db: DatabaseConnection;
    private collectionName: string = 'invoices';

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async findById(id: string): Promise<Invoice | null> {
        const data = this.db.findById(this.collectionName, id);
        return data ? this.mapToInvoice(data) : null;
    }

    async findByUserId(userId: string): Promise<Invoice[]> {
        const invoices = this.db.findAll(this.collectionName);
        const userInvoices = invoices.filter(inv => inv.userId === userId);
        return userInvoices.map(inv => this.mapToInvoice(inv));
    }

    async findBySubscriptionId(subscriptionId: string): Promise<Invoice[]> {
        const invoices = this.db.findAll(this.collectionName);
        const subInvoices = invoices.filter(inv => inv.subscriptionId === subscriptionId);
        return subInvoices.map(inv => this.mapToInvoice(inv));
    }

    async create(invoice: Invoice): Promise<Invoice> {
        this.db.insert(this.collectionName, { ...invoice });
        return invoice;
    }

    async update(id: string, invoice: Partial<Invoice>): Promise<Invoice | null> {
        const existing = await this.findById(id);
        if (!existing) return null;
        
        const updated = { ...existing, ...invoice };
        this.db.update(this.collectionName, id, updated);
        return this.mapToInvoice(updated);
    }

    async delete(id: string): Promise<boolean> {
        return this.db.delete(this.collectionName, id);
    }

    async findUnpaid(): Promise<Invoice[]> {
        const invoices = this.db.findAll(this.collectionName);
        const unpaid = invoices.filter(inv => inv.status === InvoiceStatus.UNPAID || inv.status === InvoiceStatus.PENDING);
        return unpaid.map(inv => this.mapToInvoice(inv));
    }

    async findAll(): Promise<Invoice[]> {
        const invoices = this.db.findAll(this.collectionName);
        return invoices.map(inv => this.mapToInvoice(inv));
    }

    private mapToInvoice(data: any): Invoice {
        const invoice = new Invoice(
            data.id,
            data.subscriptionId,
            data.userId,
            data.amount,
            data.status,
            new Date(data.dueDate),
            data.paidAt ? new Date(data.paidAt) : null,
            data.items.map((item: any) => new InvoiceItem(item.description, item.amount, item.quantity)),
            new Date(data.createdAt)
        );
        return invoice;
    }
}