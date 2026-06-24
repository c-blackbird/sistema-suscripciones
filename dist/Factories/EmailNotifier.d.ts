import { INotifier } from './Interfaces/INotifier';
export declare class EmailNotifier implements INotifier {
    private simulateDelay;
    send(to: string, subject: string, message: string): Promise<void>;
    getType(): string;
}
