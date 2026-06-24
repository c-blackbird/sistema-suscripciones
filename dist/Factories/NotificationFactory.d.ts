import { INotifier } from './Interfaces/INotifier';
export declare class NotificationFactory {
    private static instance;
    private notifierCache;
    private constructor();
    static getInstance(): NotificationFactory;
    createNotifier(channel: string): INotifier;
    createNotifiers(channels: string[]): INotifier[];
    registerNotifier(channel: string, notifierClass: new () => INotifier): void;
}
