// src/Factories/SMSNotifier.ts
import { INotifier } from './Interfaces/INotifier';

export class SMSNotifier implements INotifier {
    private async simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async send(to: string, subject: string, message: string): Promise<void> {
        console.log(`\n[sms] sending to: ${to}`);
        console.log(`   message: ${message.substring(0, 160)}${message.length > 160 ? '...' : ''}`);
        console.log(`   status: sent successfully`);
        await this.simulateDelay(300);
    }

    getType(): string {
        return 'sms';
    }
}