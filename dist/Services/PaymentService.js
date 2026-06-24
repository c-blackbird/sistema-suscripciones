"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const PaymentSubject_1 = require("../Observers/PaymentSubject");
const crypto_1 = require("crypto");
class PaymentService {
    constructor() {
        this.paymentSubject = new PaymentSubject_1.PaymentSubject();
    }
    attachObserver(observer) {
        this.paymentSubject.attach(observer);
    }
    detachObserver(observer) {
        this.paymentSubject.detach(observer);
    }
    async processPayment(userId, subscriptionId, amount, paymentMethod) {
        try {
            console.log(`\n[paymentservice] processing payment...`);
            console.log(`   user: ${userId}`);
            console.log(`   amount: $${amount.toFixed(2)}`);
            console.log(`   method: ${paymentMethod}`);
            await this.simulateProcessing(1000);
            const paymentData = {
                userId,
                subscriptionId,
                amount,
                paymentMethod,
                transactionId: `txn-${(0, crypto_1.randomUUID)().substring(0, 8).toUpperCase()}`,
                timestamp: new Date()
            };
            console.log(`payment processed successfully`);
            console.log(`   transaction id: ${paymentData.transactionId}`);
            await this.paymentSubject.notify(paymentData);
            return paymentData;
        }
        catch (error) {
            console.error(`error processing payment:`, error);
            throw error;
        }
    }
    simulateProcessing(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=PaymentService.js.map