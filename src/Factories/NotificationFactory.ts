// src/Factories/NotificationFactory.ts
import { INotifier } from './Interfaces/INotifier';
import { EmailNotifier } from './EmailNotifier';
import { SMSNotifier } from './SMSNotifier';
import { PushNotifier } from './PushNotifier';
import { WhatsAppNotifier } from './WhatsAppNotifier';

export class NotificationFactory {
    private static instance: NotificationFactory;
    private notifierCache: Map<string, INotifier> = new Map();

    private constructor() {
        console.log('notification factory initialized');
    }

    public static getInstance(): NotificationFactory {
        if (!NotificationFactory.instance) {
            NotificationFactory.instance = new NotificationFactory();
        }
        return NotificationFactory.instance;
    }

    createNotifier(channel: string): INotifier {
        if (this.notifierCache.has(channel)) {
            console.log(`reusing notifier: ${channel}`);
            return this.notifierCache.get(channel)!;
        }

        let notifier: INotifier;
        
        switch (channel.toLowerCase()) {
            case 'email':
                notifier = new EmailNotifier();
                break;
            case 'sms':
                notifier = new SMSNotifier();
                break;
            case 'push':
                notifier = new PushNotifier();
                break;
            case 'whatsapp':
                notifier = new WhatsAppNotifier();
                break;
            default:
                throw new Error(`notification channel not supported: ${channel}`);
        }

        this.notifierCache.set(channel, notifier);
        console.log(`new notifier created: ${channel}`);
        return notifier;
    }

    createNotifiers(channels: string[]): INotifier[] {
        return channels.map(channel => this.createNotifier(channel));
    }

    registerNotifier(channel: string, notifierClass: new () => INotifier): void {
        const notifier = new notifierClass();
        this.notifierCache.set(channel, notifier);
        console.log(`new channel registered: ${channel}`);
    }
}