import { INotifier } from './Interfaces/INotifier';
export declare class SMSNotifier implements INotifier {
    private simulateDelay;
    send(to: string, subject: string, message: string): Promise<void>;
    getType(): string;
}
