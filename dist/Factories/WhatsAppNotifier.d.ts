import { INotifier } from './Interfaces/INotifier';
export declare class WhatsAppNotifier implements INotifier {
    private simulateDelay;
    send(to: string, subject: string, message: string): Promise<void>;
    getType(): string;
}
