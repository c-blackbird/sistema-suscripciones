import { PaymentData } from '../Types/PaymentData';
import { IObserver } from '../Observers/Interfaces/IObserver';
export declare class PaymentService {
    private paymentSubject;
    constructor();
    attachObserver(observer: IObserver): void;
    detachObserver(observer: IObserver): void;
    processPayment(userId: string, subscriptionId: string, amount: number, paymentMethod: string): Promise<PaymentData>;
    private simulateProcessing;
}
