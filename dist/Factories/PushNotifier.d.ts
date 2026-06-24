import { INotifier } from './Interfaces/INotifier';
export declare class PushNotifier implements INotifier {
    private simulateDelay;
    send(to: string, subject: string, message: string): Promise<void>;
    getType(): string;
}
