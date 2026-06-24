// src/Observers/EmailNotificationObserver.ts
import { IObserver } from './Interfaces/IObserver';
import { PaymentData } from '../Types/PaymentData';
import { NotificationFactory } from '../Factories/NotificationFactory';
import { UserRepository } from '../Repositories/UserRepository';
import { InvoiceRepository } from '../Repositories/InvoiceRepository';
import { Invoice, InvoiceStatus } from '../Models/Invoice';
import { InvoiceItem } from '../Models/InvoiceItem';
import { randomUUID } from 'crypto';

export class EmailNotificationObserver implements IObserver {
    private notificationFactory: NotificationFactory;
    private userRepository: UserRepository;
    private invoiceRepository: InvoiceRepository;

    constructor() {
        this.notificationFactory = NotificationFactory.getInstance();
        this.userRepository = new UserRepository();
        this.invoiceRepository = new InvoiceRepository();
    }

    async update(data: PaymentData): Promise<void> {
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

        } catch (error) {
            console.error(`error in emailnotificationobserver:`, error);
            throw error;
        }
    }

    private async createInvoice(data: PaymentData, user: any): Promise<Invoice> {
        const invoice = new Invoice(
            randomUUID(),
            data.subscriptionId,
            data.userId,
            data.amount,
            InvoiceStatus.PAID,
            new Date(),
            new Date()
        );

        invoice.addItem(new InvoiceItem(
            `subscription ${data.paymentMethod}`,
            data.amount,
            1
        ));

        await this.invoiceRepository.create(invoice);
        return invoice;
    }

    private generateInvoiceMessage(user: any, invoice: Invoice, data: PaymentData): string {
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