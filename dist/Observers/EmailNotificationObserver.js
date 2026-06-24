"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationObserver = void 0;
const NotificationFactory_1 = require("../Factories/NotificationFactory");
const UserRepository_1 = require("../Repositories/UserRepository");
const InvoiceRepository_1 = require("../Repositories/InvoiceRepository");
const Invoice_1 = require("../Models/Invoice");
const InvoiceItem_1 = require("../Models/InvoiceItem");
const crypto_1 = require("crypto");
class EmailNotificationObserver {
    constructor() {
        this.notificationFactory = NotificationFactory_1.NotificationFactory.getInstance();
        this.userRepository = new UserRepository_1.UserRepository();
        this.invoiceRepository = new InvoiceRepository_1.InvoiceRepository();
    }
    async update(data) {
        try {
            console.log(`\n[emailnotificationobserver] processing...`);
            const user = await this.userRepository.findById(data.userId);
            if (!user) {
                console.log(`user ${data.userId} not found`);
                return;
            }
            const invoice = await this.createInvoice(data, user);
            console.log(`invoice generated: ${invoice.id}`);
            const channel = user.preferences.notificationChannel || 'email';
            const notifier = this.notificationFactory.createNotifier(channel);
            const subject = `invoice #${data.transactionId} - premium subscription`;
            const message = this.generateInvoiceMessage(user, invoice, data);
            await notifier.send(user.email, subject, message);
            console.log(`invoice sent to ${user.email} via ${channel}`);
        }
        catch (error) {
            console.error(`error in emailnotificationobserver:`, error);
            throw error;
        }
    }
    async createInvoice(data, user) {
        const invoice = new Invoice_1.Invoice((0, crypto_1.randomUUID)(), data.subscriptionId, data.userId, data.amount, Invoice_1.InvoiceStatus.PAID, new Date(), new Date());
        invoice.addItem(new InvoiceItem_1.InvoiceItem(`subscription ${data.paymentMethod}`, data.amount, 1));
        await this.invoiceRepository.create(invoice);
        return invoice;
    }
    generateInvoiceMessage(user, invoice, data) {
        return `
========================================
    premium subscription invoice
========================================

dear ${user.name},

your payment has been processed successfully.

invoice details
─────────────────────────────
invoice id:     ${invoice.id}
transaction id: ${data.transactionId}
date:           ${data.timestamp.toLocaleString()}
payment method: ${data.paymentMethod}

payment details
─────────────────────────────
concept:        premium subscription
total amount:   $${data.amount.toFixed(2)}
status:         paid

plan summary
─────────────────────────────
user:           ${user.name}
email:          ${user.email}
subscription id: ${data.subscriptionId}
start date:     ${new Date().toLocaleDateString()}
next payment:   ${new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}

active benefits
─────────────────────────────
- full access
- 24/7 support
- unlimited projects
- 50gb storage
- advanced analytics

========================================`;
    }
}
exports.EmailNotificationObserver = EmailNotificationObserver;
//# sourceMappingURL=EmailNotificationObserver.js.map