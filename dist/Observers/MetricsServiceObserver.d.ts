import { IObserver } from './Interfaces/IObserver';
import { PaymentData } from '../Types/PaymentData';
export declare class MetricsServiceObserver implements IObserver {
    private db;
    private metrics;
    constructor();
    update(data: PaymentData): Promise<void>;
    getMetrics(): any;
}
