import { PaymentData } from '../../Types/PaymentData';
export interface IObserver {
    update(data: PaymentData): Promise<void>;
}
