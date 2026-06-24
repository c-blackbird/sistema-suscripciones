import { IObserver } from './Interfaces/IObserver';
import { PaymentData } from '../Types/PaymentData';
export declare class PaymentSubject {
    private observers;
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(data: PaymentData): Promise<void>;
    getObserverCount(): number;
}
