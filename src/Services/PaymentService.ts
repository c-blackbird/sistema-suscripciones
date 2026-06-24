// src/Services/PaymentService.ts
import { PaymentData } from '../Types/PaymentData';
import { PaymentSubject } from '../Observers/PaymentSubject';
import { IObserver } from '../Observers/Interfaces/IObserver';
import { randomUUID } from 'crypto';

export class PaymentService {
    private paymentSubject: PaymentSubject;

    constructor() {
        this.paymentSubject = new PaymentSubject();
    }

    public attachObserver(observer: IObserver): void {
        this.paymentSubject.attach(observer);
    }

    public detachObserver(observer: IObserver): void {
        this.paymentSubject.detach(observer);
    }

    public async processPayment(
        userId: string,
        subscriptionId: string,
        amount: number,
        paymentMethod: string
    ): Promise<PaymentData> {
        try {
            console.log(`\n[paymentservice] processing payment...`);
            console.log(`   user: ${userId}`);
            console.log(`   amount: $${amount.toFixed(2)}`);
            console.log(`   method: ${paymentMethod}`);

            await this.simulateProcessing(1000);

            const paymentData: PaymentData = {
                userId,
                subscriptionId,
                amount,
                paymentMethod,
                transactionId: `txn-${randomUUID().substring(0, 8).toUpperCase()}`,
                timestamp: new Date()
            };

            console.log(`payment processed successfully`);
            console.log(`   transaction id: ${paymentData.transactionId}`);

            await this.paymentSubject.notify(paymentData);

            return paymentData;
        } catch (error) {
            console.error(`error processing payment:`, error);
            throw error;
        }
    }

    private simulateProcessing(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}