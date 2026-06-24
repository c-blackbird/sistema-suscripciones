import { IObserver } from './Interfaces/IObserver';
import { PaymentData } from '../Types/PaymentData';
export declare class AccessControlObserver implements IObserver {
    private subscriptionRepository;
    constructor();
    update(data: PaymentData): Promise<void>;
}
