"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRepository = void 0;
// src/Repositories/InvoiceRepository.ts
const DatabaseConnection_1 = require("../Config/DatabaseConnection");
const Invoice_1 = require("../Models/Invoice");
const InvoiceItem_1 = require("../Models/InvoiceItem");
class InvoiceRepository {
    constructor() {
        this.collectionName = 'invoices';
        this.db = DatabaseConnection_1.DatabaseConnection.getInstance();
    }
    async findById(id) {
        const data = this.db.findById(this.collectionName, id);
        return data ? this.mapToInvoice(data) : null;
    }
    async findByUserId(userId) {
        const invoices = this.db.findAll(this.collectionName);
        const userInvoices = invoices.filter(inv => inv.userId === userId);
        return userInvoices.map(inv => this.mapToInvoice(inv));
    }
    async findBySubscriptionId(subscriptionId) {
        const invoices = this.db.findAll(this.collectionName);
        const subInvoices = invoices.filter(inv => inv.subscriptionId === subscriptionId);
        return subInvoices.map(inv => this.mapToInvoice(inv));
    }
    async create(invoice) {
        this.db.insert(this.collectionName, { ...invoice });
        return invoice;
    }
    async update(id, invoice) {
        const existing = await this.findById(id);
        if (!existing)
            return null;
        const updated = { ...existing, ...invoice };
        this.db.update(this.collectionName, id, updated);
        return this.mapToInvoice(updated);
    }
    async delete(id) {
        return this.db.delete(this.collectionName, id);
    }
    async findUnpaid() {
        const invoices = this.db.findAll(this.collectionName);
        const unpaid = invoices.filter(inv => inv.status === Invoice_1.InvoiceStatus.UNPAID || inv.status === Invoice_1.InvoiceStatus.PENDING);
        return unpaid.map(inv => this.mapToInvoice(inv));
    }
    async findAll() {
        const invoices = this.db.findAll(this.collectionName);
        return invoices.map(inv => this.mapToInvoice(inv));
    }
    mapToInvoice(data) {
        const invoice = new Invoice_1.Invoice(data.id, data.subscriptionId, data.userId, data.amount, data.status, new Date(data.dueDate), data.paidAt ? new Date(data.paidAt) : null, data.items.map((item) => new InvoiceItem_1.InvoiceItem(item.description, item.amount, item.quantity)), new Date(data.createdAt));
        return invoice;
    }
}
exports.InvoiceRepository = InvoiceRepository;
//# sourceMappingURL=InvoiceRepository.js.map