export interface PaymentData {
    userId: string;
    subscriptionId: string;
    amount: number;
    paymentMethod: string;
    transactionId: string;
    timestamp: Date;
}
