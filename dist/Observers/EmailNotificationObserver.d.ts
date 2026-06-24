import { IObserver } from './Interfaces/IObserver';
import { PaymentData } from '../Types/PaymentData';
export declare class EmailNotificationObserver implements IObserver {
    private notificationFactory;
    private userRepository;
    private invoiceRepository;
    constructor();
    update(data: PaymentData): Promise<void>;
    private createInvoice;
    private generateInvoiceMessage;
}
