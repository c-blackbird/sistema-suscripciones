// src/Factories/PushNotifier.ts
import { INotifier } from './Interfaces/INotifier';

export class PushNotifier implements INotifier {
    private async simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async send(to: string, subject: string, message: string): Promise<void> {
        console.log(`\n[push] sending to: ${to}`);
        console.log(`   title: ${subject}`);
        console.log(`   message: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
        console.log(`   status: sent successfully`);
        await this.simulateDelay(200);
    }

    getType(): string {
        return 'push';
    }
}